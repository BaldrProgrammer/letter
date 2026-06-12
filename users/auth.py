from settings import get_token_data
from passlib.context import CryptContext

TOKEN_DATA = get_token_data()
crypt_context = CryptContext('bcrypt')


def get_hashed_password(password: str):
    return crypt_context.hash(password)


def verify_password(password: str, hashed_password: str):
    crypt_context.verify(password, hashed_password)
