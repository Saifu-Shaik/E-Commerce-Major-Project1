from django.core.mail import send_mail

def send_verification_email(email, token):
    subject = "Verify Your Email – E-Shop"
    message = f"""
Click the link below to verify your email:

http://127.0.0.1:8000/api/users/verify/{token}/
"""
    send_mail(subject, message, "yourgmail@gmail.com", [email])