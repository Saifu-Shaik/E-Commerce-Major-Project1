from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

# ✅ Root endpoint (VERY IMPORTANT for Render)
def home(request):
    return JsonResponse({"message": "Backend is running"})

# ✅ Health check for Render
def health_check(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path("", home),   # ✅ ADDED (fixes your timeout issue)
    path("admin/", admin.site.urls),

    # Your API routes
    path("api/", include("app.urls")),

    # Health check
    path("healthz/", health_check),
]

# ✅ Serve media (works for local + Render)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
