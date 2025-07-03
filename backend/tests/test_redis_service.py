import pytest

from backend.services import redis as redis_service


@pytest.mark.asyncio
async def test_initialize_and_set_get():
    # 初始化并获取客户端
    client = await redis_service.initialize_async()
    assert client is not None
    # 测试 set/get
    test_key = "pytest:redis:service"
    await client.set(test_key, "world")
    value = await client.get(test_key)
    assert value == "world"
    await client.delete(test_key)
    # 关闭连接
    await redis_service.close()
