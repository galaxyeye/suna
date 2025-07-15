# Agent Sandbox

This directory contains the agent sandbox implementation - a Docker-based virtual environment that agents use as their own computer to execute tasks, access the web, and manipulate files.

## Overview

The sandbox provides a complete containerized Linux environment with:
- Chrome browser for web interactions
- VNC server for accessing the Web User
- Web server for serving content (port 8080) -> loading html files from the /workspace directory
- Full file system access
- Full sudo access

## Customizing the Sandbox

You can modify the sandbox environment for development or to add new capabilities:

1. Edit files in the `docker/` directory
2. Build a custom image:
   ```
   cd backend/sandbox/docker
   docker compose build
   docker push galaxyeye88/suna:0.1.3
   ```
3. Test your changes locally using docker-compose

## Using a Custom Image

To use your custom sandbox image:

1. Change the `image` parameter in `docker-compose.yml` (that defines the image name `galaxyeye88/suna:___`)
2. Update the same image name in `backend/sandbox/sandbox.py` in the `create_sandbox` function
3. If using Daytona for deployment, update the image reference there as well

## Publishing New Versions

When publishing a new version of the sandbox:

1. Update the version number in `docker-compose.yml` (e.g., from `0.1.2` to `0.1.3`)
2. Build the new image: `docker compose build`
3. Push the new version: `docker push galaxyeye88/suna:0.1.3`
4. Update all references to the image version in:
   - `backend/utils/config.py`
   - Daytona images
   - Any other services using this image

## Use a Custom Daytona Service

To set up a custom Daytona service, you generally need to follow these steps:

1. **Obtain Daytona server source code or image**  
   It is recommended to use the official Docker image. You can find related resources on the [Daytona official GitHub](https://github.com/daytonaio/daytona) or Docker Hub.

2. **Prepare configuration files**  
   Daytona requires configuration of API keys, databases, etc. You can refer to the official documentation or sample configuration files for setup.

3. **Start the service using Docker**  
   For example, using Docker, the common command is:

   ```bash
   docker run -d \
     --name daytona-server \
     -e DAYTONA_API_KEY=your_api_key \
     -e DAYTONA_DB_URL=sqlite:///data/daytona.db \
     -p 8080:8080 \
     daytonaio/daytona:latest
   ```

   You can modify ports, database parameters, etc. as needed.

4. **Connect with local SDK**  
   In your local Python project, configure `DAYTONA_API_KEY` and `DAYTONA_API_URL` to point to your local service (such as `http://localhost:8080`).

5. **Verify service availability**  
   Use a browser or Postman to access `http://localhost:8080` to confirm the service is running.

For detailed steps and advanced configuration, refer to the [Daytona official documentation](https://docs.daytona.io/).
