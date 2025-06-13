
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import fitz  # PyMuPDF
import json
from .hug import cohereModel
@csrf_exempt
def parsePDF(request):
    if request.method =="POST":
        uploaded_file = request.FILES.get('resume')

        if not uploaded_file:
            return JsonResponse({'error':"No file uploaded"}, status=400)
        pdf_content =""
        with fitz.open(stream=uploaded_file.read(),filetype="pdf") as doc:
            for page in doc:
                pdf_content += page.get_text()
        try:
            structured_data=cohereModel(pdf_content)
            return JsonResponse(structured_data)
        except Exception as e:
            return JsonResponse({'error':str(e)}, status=500)
    return JsonResponse({'error':"Only Post is allowed"}, status=405)

        


