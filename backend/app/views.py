from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.conf import settings

from .models import Product, Order, OrderItem, ShippingAddress, UserProfile
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    ProductSerializer,
    OrderSerializer,
    UserProfileSerializer,
)

# ============================================================
# TOKEN
# ============================================================
def generate_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }


# ============================================================
# AUTH
# ============================================================
@api_view(["POST"])
def loginUser(request):
    user = authenticate(
        username=request.data.get("username"),
        password=request.data.get("password")
    )

    if not user:
        return Response({"detail": "Invalid credentials"}, status=400)

    profile, _ = UserProfile.objects.get_or_create(user=user)

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_superuser,
        "profile": {} if user.is_superuser else UserProfileSerializer(profile).data,
        **generate_tokens(user),
    })


@api_view(["POST"])
def registerUser(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        user.is_staff = False
        user.is_superuser = False
        user.save()

        UserProfile.objects.get_or_create(user=user)

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": False,
            "profile": {},
            **generate_tokens(user),
        })

    return Response(serializer.errors, status=400)


# ============================================================
# PROFILE
# ============================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)

    return Response({
        "id": request.user.id,
        "username": request.user.username,
        "email": request.user.email,
        "is_admin": request.user.is_superuser,
        "profile": UserProfileSerializer(profile).data,
    })


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    profile, _ = UserProfile.objects.get_or_create(user=user)

    user.username = request.data.get("username", user.username)
    user.email = request.data.get("email", user.email)

    if request.data.get("password"):
        user.set_password(request.data["password"])

    user.save()

    profile.first_name = request.data.get("first_name", profile.first_name)
    profile.last_name = request.data.get("last_name", profile.last_name)
    profile.phone = request.data.get("phone", profile.phone)
    profile.saved_address = request.data.get("saved_address", profile.saved_address)
    profile.save()

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": False,
        "profile": UserProfileSerializer(profile).data,
        **generate_tokens(user),
    })


# ============================================================
# ADMIN USERS
# ============================================================
@api_view(["GET"])
@permission_classes([IsAdminUser])
def adminGetUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def adminDeleteUser(request, pk):
    try:
        User.objects.get(id=pk).delete()
        return Response({"detail": "User deleted"})
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)


# ============================================================
# PRODUCTS
# ============================================================
@api_view(["GET"])
def getProducts(request):
    products = Product.objects.all()
    return Response(ProductSerializer(products, many=True).data)


@api_view(["GET"])
def getProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        return Response(ProductSerializer(product).data)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=404)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def adminGetProducts(request):
    return Response(ProductSerializer(Product.objects.all(), many=True).data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(request):
    product = Product.objects.create(
        user=request.user,
        name=request.data.get("name"),
        brand=request.data.get("brand"),
        price=request.data.get("price"),
        countInStock=request.data.get("countInStock"),
        description=request.data.get("description"),
        image=request.data.get("image", "")
    )
    return Response(ProductSerializer(product).data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)

        product.name = request.data.get("name", product.name)
        product.brand = request.data.get("brand", product.brand)
        product.price = request.data.get("price", product.price)
        product.countInStock = request.data.get("countInStock", product.countInStock)
        product.description = request.data.get("description", product.description)

        if request.data.get("image") is not None:
            product.image = request.data.get("image")

        product.save()
        return Response(ProductSerializer(product).data)

    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=404)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        Product.objects.get(id=pk).delete()
        return Response({"detail": "Product deleted"})
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=404)


# ============================================================
# ORDERS
# ============================================================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    data = request.data

    if not data.get("orderItems") or len(data["orderItems"]) == 0:
        return Response({"detail": "No order items"}, status=400)

    order = Order.objects.create(
        user=request.user,
        paymentMethod=data.get("paymentMethod", ""),
        taxPrice=data.get("taxPrice", 0),
        shippingPrice=data.get("shippingPrice", 0),
        totalPrice=data.get("totalPrice", 0),
    )

    ShippingAddress.objects.create(order=order, **data.get("shippingAddress", {}))

    for item in data["orderItems"]:
        product = Product.objects.get(id=item["product"])

        OrderItem.objects.create(
            order=order,
            product=product,
            name=product.name,
            qty=item["qty"],
            price=item["price"],
            image=product.image
        )

        product.countInStock -= item["qty"]
        product.save()

    return Response(OrderSerializer(order).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    orders = Order.objects.filter(user=request.user).order_by("-createdAt")
    return Response(OrderSerializer(orders, many=True).data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def adminGetOrders(request):
    return Response(OrderSerializer(Order.objects.all(), many=True).data)


# ✅ FIXED ADMIN UPDATE (supports paid + delivered)
@api_view(["PUT"])
@permission_classes([IsAdminUser])
def adminUpdateOrder(request, pk):
    try:
        order = Order.objects.get(id=pk)

        if request.data.get("isPaid"):
            order.isPaid = True
            order.paidAt = timezone.now()

        if request.data.get("isDelivered"):
            order.isDelivered = True
            order.deliveredAt = timezone.now()

        order.save()

        return Response(OrderSerializer(order).data)

    except Order.DoesNotExist:
        return Response({"detail": "Order not found"}, status=404)


# ============================================================
# PASSWORD RESET
# ============================================================
@api_view(["POST"])
def generateResetLink(request):
    email = request.data.get("email")

    try:
        user = User.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")

        return Response({
            "message": "Reset link generated",
            "reset_link": f"{frontend_url}/reset-password/{uid}/"
        })

    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)


@api_view(["POST"])
def resetPasswordSimple(request, uid):
    password = request.data.get("password")

    try:
        user_id = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=user_id)

        user.set_password(password)
        user.save()

        return Response({"message": "Password updated successfully"})

    except:
        return Response({"detail": "Invalid reset link"}, status=400)