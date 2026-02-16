from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress, UserProfile
import re


# ============================================================
# USER PROFILE
# ============================================================
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["first_name", "last_name", "dob", "phone", "saved_address"]


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "is_staff", "profile"]

    def get_profile(self, obj):
        if obj.is_staff:
            return {}
        try:
            return UserProfileSerializer(obj.profile).data
        except UserProfile.DoesNotExist:
            return {}


# ============================================================
# REGISTER (NORMAL USER ONLY)
# ============================================================
class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise serializers.ValidationError("Password must include a special character.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.is_staff = False
        user.is_superuser = False
        user.save()
        return user


# ============================================================
# PRODUCT SERIALIZER (URL IMAGE SUPPORT)
# ============================================================
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"

    def validate_image(self, value):
        # Accept only http/https links
        if value and not value.startswith("http"):
            raise serializers.ValidationError("Only direct image URL allowed")
        return value

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # fallback image
        if not data.get("image"):
            data["image"] = "https://via.placeholder.com/500x500.png?text=No+Image"

        return data


# ============================================================
# ORDER SERIALIZERS
# ============================================================
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(many=True)
    shippingAddress = ShippingAddressSerializer()
    user = UserMiniSerializer(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def create(self, validated_data):
        order_items_data = validated_data.pop("orderItems")
        shipping_data = validated_data.pop("shippingAddress")

        order = Order.objects.create(**validated_data)

        ShippingAddress.objects.create(order=order, **shipping_data)

        for item in order_items_data:
            product = Product.objects.get(id=item["product"].id)

            OrderItem.objects.create(
                order=order,
                product=product,
                name=product.name,
                qty=item["qty"],
                price=item["price"],
                image=product.image  # store image URL permanently
            )

            # reduce stock
            product.countInStock -= item["qty"]
            product.save()

        return order
