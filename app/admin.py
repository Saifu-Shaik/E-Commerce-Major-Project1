from django.contrib import admin
from .models import Product, Order, OrderItem, ShippingAddress, UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "first_name", "last_name", "phone", "createdAt")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "brand", "price", "countInStock", "createdAt")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "paymentMethod", "totalPrice", "isPaid", "isDelivered", "createdAt")
    ordering = ("-id",)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "name", "qty", "price")


@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "address", "city", "country", "postalCode")