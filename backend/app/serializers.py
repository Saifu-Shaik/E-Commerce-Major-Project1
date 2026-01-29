from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress, UserProfile
import re



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "first_name",
            "last_name",
            "dob",
            "phone",
            "saved_address",
        ]


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



class RegisterSerializer(serializers.ModelSerializer):
    is_admin = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ["username", "email", "password", "is_admin"]
        extra_kwargs = {
            "password": {"write_only": True},
        }


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
        is_admin = validated_data.pop("is_admin", False)

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

       
        if is_admin:
            user.is_staff = True
            user.is_superuser = True

        user.save()
        return user



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"



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
    user = UserMiniSerializer()

    class Meta:
        model = Order
        fields = "__all__"
