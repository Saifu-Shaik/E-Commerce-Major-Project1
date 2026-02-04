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
    path("", home),                 # ✅ Render root check
    path("healthz/", health_check), # ✅ Render health check
    path("admin/", admin.site.urls),

    # Your API routes (unchanged)
    path("api/", include("app.urls")),
]

# ✅ IMPORTANT: Serve media files properly (LOCAL + RENDER)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
