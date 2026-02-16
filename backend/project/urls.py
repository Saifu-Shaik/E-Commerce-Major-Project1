from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

# =========================
# ROOT ENDPOINT (Render check)
# =========================
def home(request):
    return JsonResponse({"message": "Backend is running"})

# =========================
# HEALTH CHECK (Render)
# =========================
def health_check(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path("", home),                  # Render root check
    path("healthz/", health_check),  # Render health check
    path("admin/", admin.site.urls),

    # API routes
    path("api/", include("app.urls")),
]

# =========================
# MEDIA FILES (ONLY IN DEBUG)
# =========================
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
