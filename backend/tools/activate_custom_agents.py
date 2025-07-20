#!/usr/bin/env python3
"""
Simple script to activate the custom_agents feature flag
"""
import asyncio
import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

async def activate_custom_agents():
    """Activate the custom_agents feature flag"""
    try:
        from flags.flags import enable_flag

        success = await enable_flag("custom_agents", "Enable custom agents functionality")

        if success:
            print("✓ Successfully activated custom_agents feature flag")
            return True
        else:
            print("✗ Failed to activate custom_agents feature flag")
            return False

    except Exception as e:
        print(f"Error activating custom_agents: {e}")
        return False

async def check_status():
    """Check the current status of custom_agents"""
    try:
        from flags.flags import is_enabled, get_flag_details

        enabled = await is_enabled("custom_agents")
        details = await get_flag_details("custom_agents")

        print(f"custom_agents status: {'ENABLED' if enabled else 'DISABLED'}")

        if details:
            print(f"Description: {details.get('description', 'No description')}")
            print(f"Updated: {details.get('updated_at', 'Unknown')}")

        return enabled

    except Exception as e:
        print(f"Error checking custom_agents status: {e}")
        return False

async def main():
    print("Custom Agents Feature Flag Activator")
    print("=" * 40)

    # First check current status
    print("\nChecking current status...")
    current_status = await check_status()

    if current_status:
        print("\n✓ custom_agents is already enabled!")
        return

    # Activate the flag
    print("\nActivating custom_agents...")
    success = await activate_custom_agents()

    if success:
        print("\nVerifying activation...")
        await check_status()

if __name__ == "__main__":
    asyncio.run(main())
