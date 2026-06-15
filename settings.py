from pydantic_settings import BaseSettings, SettingsConfigDict
import os


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    JWT_KEY: str
    JWT_ALGORITHM: str
    EMAIL_ADDRESS: str
    EMAIL_PASSCODE: str

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    )


settings = Settings()


def get_db_url():
    return f'postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}'


def get_jwt_data():
    return {'key': settings.JWT_KEY, 'algorithm': settings.JWT_ALGORITHM}


def get_email_data():
    return {'address': settings.EMAIL_ADDRESS, 'passcode': settings.EMAIL_PASSCODE}
