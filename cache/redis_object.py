from 

class RedisCacheBackend:
    def __init__(self, redis: ):
        self.redis = redis

    def get(self, key: str):
        ...

    def set(self, key: str, value):
        ...

    def delete(self, key: str):
        ...
