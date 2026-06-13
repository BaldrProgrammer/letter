from settings import get_jwt_data
from jose import jwt
import bcrypt

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
