from django.urls import path
from . import views

urlpatterns = [

    # =========================
    # AUTH
    # =========================
    path("users/login/", views.loginUser, name="login"),
    path("users/register/", views.registerUser, name="register"),

    # =========================
    # PROFILE
    # =========================
    path("users/profile/", views.getUserProfile, name="profile"),
    path("users/profile/update/", views.updateUserProfile, name="profile-update"),

    # =========================
    # ADMIN USERS
    # =========================
    path("admin/users/", views.adminGetUsers, name="admin-users"),
    path("admin/users/delete/<int:pk>/", views.adminDeleteUser, name="admin-user-delete"),

    # =========================
    # PRODUCTS (PUBLIC)
    # =========================
    path("products/", views.getProducts, name="products"),
    path("products/<int:pk>/", views.getProduct, name="product"),

    # =========================
    # PRODUCTS (ADMIN)
    # =========================
    path("admin/products/", views.adminGetProducts, name="admin-products"),
    path("admin/products/create/", views.createProduct, name="admin-product-create"),
    path("admin/products/update/<int:pk>/", views.updateProduct, name="admin-product-update"),
    path("admin/products/delete/<int:pk>/", views.deleteProduct, name="admin-product-delete"),

    # =========================
    # ORDERS (USER)
    # =========================
    path("orders/add/", views.addOrderItems, name="order-add"),
    path("orders/my/", views.getMyOrders, name="my-orders"),

    # =========================
    # ORDERS (ADMIN)
    # =========================
    path("admin/orders/", views.adminGetOrders, name="admin-orders"),
    path("admin/orders/update/<int:pk>/", views.adminUpdateOrder, name="admin-order-update"),

    # =====================================================
    # 🔐 PASSWORD RESET (Evaluator Requirement)
    # =====================================================
    path("users/forgot-password/", views.forgotPassword, name="forgot-password"),
    path("users/reset-password/<str:uid>/<str:token>/", views.verifyResetToken, name="verify-reset-token"),
    path("users/reset-password-confirm/", views.resetPasswordConfirm, name="reset-password-confirm"),
]
