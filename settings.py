from pydantic_settings import BaseSettings, SettingsConfigDict
import os


class Settings(BaseSettings):
    HOST: str
    PORT: int
    USER: str
    PASSWORD: str
    DATABASE: str

    model_config = SettingsConfigDict(
        os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    )


settings = Settings()


def get_db_url():
    return f'postgres+asyncpg://{settings.USER}:{settings.PASSWORD}@{settings.HOST}:{settings.PORT}/{settings.DATABASE}'
