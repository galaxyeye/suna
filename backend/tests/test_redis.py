import pytest
import redis.asyncio


def test_redis_connection():
    client = redis.Redis(host="localhost", port=6379, db=0)
    try:
        client.ping()
    except Exception as e:
        pytest.fail(f"Redis 连接失败: {e}")


def test_redis_connection_pool():
    pool = redis.ConnectionPool(host="localhost", port=6379, db=0)
    client = redis.Redis(connection_pool=pool)
    try:
        client.ping()
    except Exception as e:
        pytest.fail(f"Redis 连接池测试失败: {e}")


def test_redis_set_get_delete():
    client = redis.Redis(host="localhost", port=6379, db=0)
    test_key = "pytest:redis:rw"
    test_value = "hello"
    # 写入
    client.set(test_key, test_value)
    # 读取
    value = client.get(test_key)
    assert value == b"hello"
    # 删除
    client.delete(test_key)
    # 确认删除
    assert client.get(test_key) is None
