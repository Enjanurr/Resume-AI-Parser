from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
#from .resumeParser import ats_extractor
from .hug import cohereModel

@csrf_exempt
def parseText(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            resume_text = data.get("resume_text","")
            if not resume_text.strip():
                return JsonResponse({"error":"Empty text"}, status=400)
            structured_data= cohereModel(resume_text)
            return JsonResponse(structured_data)
        except Exception as e:
            import traceback
            print("Error occured in parsing text", str(e))
            traceback.print_exc()
            return JsonResponse({"error" : str(e)}, status=500)

    return JsonResponse({'error':"Only Post is allowed"}, status=405)
