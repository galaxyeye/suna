#!/usr/bin/env python3
"""
安装本地依赖的脚本
Install local dependencies script
"""
import subprocess
import sys
import os
from pathlib import Path

def install_daytona():
    """以开发模式安装本地daytona库"""
    # 获取backend目录的绝对路径
    backend_dir = Path(__file__).parent
    daytona_path = backend_dir / "third" / "daytona" / "sdk-python"

    if not daytona_path.exists():
        print(f"错误: daytona库路径不存在: {daytona_path}")
        return False

    print(f"正在安装本地daytona库: {daytona_path}")

    try:
        # 使用 -e 参数进行开发模式安装
        result = subprocess.run([
            sys.executable, "-m", "pip", "install", "-e", str(daytona_path)
        ], check=True, capture_output=True, text=True)

        print("✅ daytona库安装成功!")
        print(result.stdout)
        return True

    except subprocess.CalledProcessError as e:
        print(f"❌ 安装失败: {e}")
        print(f"错误输出: {e.stderr}")
        return False

if __name__ == "__main__":
    success = install_daytona()
    if success:
        print("\n🎉 所有本地依赖安装完成!")
        print("现在你可以在代码中使用: from daytona import Daytona, DaytonaConfig")
    else:
        print("\n💥 安装过程中出现错误，请检查上面的错误信息")
        sys.exit(1)
