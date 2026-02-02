from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

from .models import Product, Order, OrderItem, ShippingAddress, UserProfile
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    ProductSerializer,
    OrderSerializer,
    UserProfileSerializer,
)

def generate_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}

@api_view(["POST"])
def loginUser(request):
    data = request.data

    user = authenticate(
        username=data.get("username"),
        password=data.get("password")
    )

    if not user:
        return Response({"detail": "Invalid credentials"}, status=400)

    profile, _ = UserProfile.objects.get_or_create(user=user)
    tokens = generate_tokens(user)

    profile_data = {} if user.is_staff else UserProfileSerializer(profile).data

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_staff,
        "profile": profile_data,
        **tokens,
    })

@api_view(["POST"])
def registerUser(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        if user.is_staff:
            user.is_superuser = True
            user.save()

        UserProfile.objects.get_or_create(user=user)
        tokens = generate_tokens(user)

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": user.is_staff,
            "profile": {},
            **tokens,
        })

    return Response(serializer.errors, status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    profile, _ = UserProfile.objects.get_or_create(user=user)

    profile_data = {} if user.is_staff else UserProfileSerializer(profile).data

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_staff,
        "profile": profile_data,
    })

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    if user.is_staff:
        return Response({"detail": "Admin profile cannot be updated"}, status=403)

    data = request.data

    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)

    if data.get("password"):
        user.set_password(data["password"])

    user.save()

    profile, _ = UserProfile.objects.get_or_create(user=user)

    profile.first_name = data.get("first_name", profile.first_name)
    profile.last_name = data.get("last_name", profile.last_name)

    dob_value = data.get("dob")
    if dob_value not in ["", None]:
        profile.dob = dob_value  

    profile.phone = data.get("phone", profile.phone)
    profile.saved_address = data.get("saved_address", profile.saved_address)

    profile.save()

    tokens = generate_tokens(user)

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_staff,
        "profile": UserProfileSerializer(profile).data,
        **tokens,
    })

@api_view(["GET"])
@permission_classes([IsAdminUser])
def adminGetUsers(request):
    users = User.objects.all()
    return Response(UserSerializer(users, many=True).data)

@api_view(["GET"])
def getProducts(request):
    products = Product.objects.all()
    return Response(ProductSerializer(products, many=True, context={"request": request}).data)

@api_view(["GET"])
def getProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=404)

    return Response(ProductSerializer(product, context={"request": request}).data)

@api_view(["GET"])
@permission_classes([IsAdminUser])
def adminGetProducts(request):
    products = Product.objects.all()
    return Response(ProductSerializer(products, many=True, context={"request": request}).data)

@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(request):
    data = request.data

    product = Product.objects.create(
        user=request.user,
        name=data.get("name", ""),
        brand=data.get("brand", ""),
        price=data.get("price", 0),
        countInStock=data.get("countInStock", 0),
        description=data.get("description", "")
    )

    if "image" in request.FILES:
        product.image = request.FILES["image"]

    product.save()
    return Response(ProductSerializer(product, context={"request": request}).data)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=404)

    data = request.data

    product.name = data.get("name", product.name)
    product.brand = data.get("brand", product.brand)
    product.price = data.get("price", product.price)
    product.countInStock = data.get("countInStock", product.countInStock)
    product.description = data.get("description", product.description)

    if "image" in request.FILES:
        product.image = request.FILES["image"]

    product.save()
    return Response(ProductSerializer(product, context={"request": request}).data)

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()
        return Response({"detail": "Product deleted"})
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=404)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    if not data.get("orderItems"):
        return Response({"detail": "No order items"}, status=400)

    order = Order.objects.create(
        user=user,
        paymentMethod=data["paymentMethod"],
        taxPrice=data["taxPrice"],
        shippingPrice=data["shippingPrice"],
        totalPrice=data["totalPrice"],
    )

    ShippingAddress.objects.create(
        order=order,
        address=data["shippingAddress"]["address"],
        city=data["shippingAddress"]["city"],
        postalCode=data["shippingAddress"]["postalCode"],
        country=data["shippingAddress"]["country"],
    )

    for item in data["orderItems"]:
        product = Product.objects.get(id=item["product"])

        OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=item["qty"],
            price=item["price"],
            image=product.image.url if product.image else "",
        )

        product.countInStock -= item["qty"]
        product.save()

    return Response(OrderSerializer(order).data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    orders = Order.objects.filter(user=request.user)
    return Response(OrderSerializer(orders, many=True).data)

@api_view(["GET"])
@permission_classes([IsAdminUser])
def adminGetOrders(request):
    orders = Order.objects.all()
    return Response(OrderSerializer(orders, many=True).data)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def adminUpdateOrder(request, pk):
    try:
        order = Order.objects.get(id=pk)
    except Order.DoesNotExist:
        return Response({"detail": "Order not found"}, status=404)

    data = request.data

    if "isPaid" in data:
        order.isPaid = data["isPaid"]
        if order.isPaid:
            order.paidAt = timezone.now()

    if "isDelivered" in data:
        if data["isDelivered"] and not order.isPaid:
            return Response({"detail": "Cannot deliver unpaid order"}, status=400)

        order.isDelivered = data["isDelivered"]
        if order.isDelivered:
            order.deliveredAt = timezone.now()

    order.save()
    return Response(OrderSerializer(order).data)

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def adminDeleteUser(request, pk):
    try:
        user = User.objects.get(id=pk)
        user.delete()
        return Response({"detail": "User deleted"})
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)
