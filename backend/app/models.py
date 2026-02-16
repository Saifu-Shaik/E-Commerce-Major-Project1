from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# ============================================================
# USER PROFILE
# ============================================================
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    first_name = models.CharField(max_length=100, blank=True, default="")
    last_name = models.CharField(max_length=100, blank=True, default="")
    dob = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True, default="")
    saved_address = models.CharField(max_length=300, blank=True, default="")
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Profile"


# ============================================================
# PRODUCT  (Image stored as URL — No file storage)
# ============================================================
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    brand = models.CharField(max_length=200, blank=True, default="")
    countInStock = models.IntegerField(default=0)
    description = models.TextField(blank=True, default="")

    # ⭐ Stores only direct image links (CDN / Postimg / Cloudinary / Unsplash)
    image = models.URLField(max_length=500, blank=True, default="")

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ============================================================
# ORDER
# ============================================================
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    paymentMethod = models.CharField(max_length=200, default="")
    taxPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shippingPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id}"


# ============================================================
# ORDER ITEM
# ============================================================
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="orderItems")

    name = models.CharField(max_length=200)
    qty = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Save image URL snapshot during purchase
    image = models.URLField(max_length=500, blank=True, default="")

    def __str__(self):
        return f"{self.name} ({self.qty})"


# ============================================================
# SHIPPING ADDRESS
# ============================================================
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="shippingAddress")

    address = models.CharField(max_length=200, default="")
    city = models.CharField(max_length=200, default="")
    postalCode = models.CharField(max_length=20, default="")
    country = models.CharField(max_length=200, default="")
    shippingPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.address}, {self.city}"


# ============================================================
# SIGNALS — AUTO CREATE PROFILE (SAFE VERSION)
# ============================================================
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, "profile"):
        instance.profile.save()
