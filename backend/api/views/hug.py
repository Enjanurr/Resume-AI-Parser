
import os
import cohere


trial_key = os.environ.get('trial_key')

co = cohere.ClientV2(trial_key)

def cohereModel(resume_text):
    prompt = f"""
Extract a list of technical and soft skills from the following resume:
Resume: {resume_text}
Skills:
"""   
    response = co.chat(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": prompt}]
    )

    reply = response.message.content[0].text
    return {"skills": reply}



