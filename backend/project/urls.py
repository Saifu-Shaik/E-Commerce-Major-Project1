from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

# ✅ Health check for Render
def health_check(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path("admin/", admin.site.urls),

    # Your API routes
    path("api/", include("app.urls")),

    # ✅ IMPORTANT for Render
    path("healthz/", health_check),
]

# ✅ Serve media (works for local + Render)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
