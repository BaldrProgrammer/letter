from pydantic_settings import BaseSettings, SettingsConfigDict
import os


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    TOKEN_KEY: str
    TOKEN_ALGORITHM: str

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    )


settings = Settings()


def get_db_url():
    return f'postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}'


def get_token_data():
    return {'key': settings.TOKEN_KEY, 'algorithm': settings.TOKEN_ALGORITHM}
