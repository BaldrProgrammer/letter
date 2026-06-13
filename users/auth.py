from settings import get_jwt_data
from jose import jwt
from passlib.context import CryptContext

from datetime import datetime, timedelta

JWT_DATA = get_jwt_data()
crypt_context = CryptContext('bcrypt')


def get_hashed_password(password: str):
    return crypt_context.hash(password)


def verify_password(password: str, hashed_password: str):
    crypt_context.verify(password, hashed_password)


def jwt_encode(data: dict):
    payload = data.copy()
    expire_date = datetime.now() + timedelta(days=30)
    payload.update({'exp': expire_date})

    token = jwt.encode(payload, JWT_DATA['key'], JWT_DATA['algorithm'])
    return token

print(jwt_encode({'user_id': 75432890}))
