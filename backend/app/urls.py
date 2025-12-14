from django.urls import path
from . import views

urlpatterns = [

    
    path("users/login/", views.loginUser, name="user-login"),
    path("users/register/", views.registerUser, name="user-register"),
    path("users/profile/", views.getUserProfile, name="user-profile"),
    path("users/profile/update/", views.updateUserProfile, name="user-profile-update"),

    path("admin/users/", views.adminGetUsers, name="admin-users"),
    path("admin/users/delete/<int:pk>/", views.adminDeleteUser, name="admin-user-delete"),


    path("products/", views.getProducts, name="products"),
    path("products/<int:pk>/", views.getProduct, name="product-detail"),

    
    path("admin/products/", views.adminGetProducts, name="admin-products"),
    path("admin/products/create/", views.createProduct, name="admin-product-create"),
    path("admin/products/update/<int:pk>/", views.updateProduct, name="admin-product-update"),
    path("admin/products/delete/<int:pk>/", views.deleteProduct, name="admin-product-delete"),

    path("orders/add/", views.addOrderItems, name="order-add"),
    path("orders/my/", views.getMyOrders, name="my-orders"),


    path("admin/orders/", views.adminGetOrders, name="admin-orders"),
    path("admin/orders/update/<int:pk>/", views.adminUpdateOrder, name="admin-order-update"),
]
