from django.urls import path
from . import views

urlpatterns = [

    # =========================
    # AUTH
    # =========================
    path("users/login/", views.loginUser),
    path("users/register/", views.registerUser),

    # =========================
    # PROFILE
    # =========================
    path("users/profile/", views.getUserProfile),
    path("users/profile/update/", views.updateUserProfile),

    # =========================
    # ADMIN USERS
    # =========================
    path("admin/users/", views.adminGetUsers),

    # =========================
    # PRODUCTS (PUBLIC)
    # =========================
    path("products/", views.getProducts),
    path("products/<int:pk>/", views.getProduct),

    # =========================
    # PRODUCTS (ADMIN)
    # =========================
    path("admin/products/create/", views.createProduct),
    path("admin/products/update/<int:pk>/", views.updateProduct),
    path("admin/products/delete/<int:pk>/", views.deleteProduct),
]
