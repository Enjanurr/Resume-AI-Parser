from django.urls import path
from .views import parsePDF_view, parseText_view

urlpatterns = [
    path("pdf/",parsePDF_view,name="parse_pdf"),
    path("text/",parseText_view,name="parse_text"),
]