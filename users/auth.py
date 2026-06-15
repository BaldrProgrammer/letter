from settings import get_jwt_data, get_email_data
from jose import jwt
import bcrypt
import smtplib
from email.message import EmailMessage
import random

from datetime import datetime, timedelta

JWT_DATA = get_jwt_data()


def get_hashed_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(password: str, hashed_password: str):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


def jwt_encode(data: dict):
    payload = data.copy()
    expire_date = datetime.now() + timedelta(days=30)
    payload.update({'exp': expire_date})

    token = jwt.encode(payload, JWT_DATA['key'], JWT_DATA['algorithm'])
    return token


def jwt_decode(token: str):
    return jwt.decode(token, JWT_DATA['key'], JWT_DATA['algorithm'])


def send_email(smtp_host, smtp_port, username, password, sender, to, subject, body):
    msg = EmailMessage()
    msg["From"] = sender
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as smtp:
        smtp.login(username, password)
        smtp.send_message(msg)


def send_code(to):
    email_data = get_email_data()
    print(email_data)
    code = random.randint(100_000, 999_999)
    text = f'Your login code: {code}'
    send_email(
        smtp_host="smtp.gmail.com",
        smtp_port=465,
        username=email_data['address'],
        password=email_data['passcode'],
        sender="sosnierzbot@gmail.com",
        to=to,
        subject=f"Auth code for letter",
        body=text
    )

    return code
