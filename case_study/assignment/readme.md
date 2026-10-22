# Docker Lab Practicals 

> **Assignment II: Docker Programs and Demonstrations**
> All 9 practicals with commands, expected outputs, and explanations.

---

## Practical 1: Verify Docker Installation

**Aim:** To verify that Docker is installed and running correctly.

```bash
docker --version
docker run hello-world
```

**Expected Output:**
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

**Viva Q:** *What is the difference between a Docker image and a Docker container?*
> A **Docker image** is a read-only blueprint (template) used to create containers. A **Docker container** is a running instance of an image — it is the actual live process.

---

## Practical 2: Pull and List Docker Images

**Aim:** To download an image from Docker Hub and inspect locally available images.

```bash
# Pull the Ubuntu image from Docker Hub
docker pull ubuntu

# Pull a specific version (tag)
docker pull nginx:latest

# List all locally available images
docker images

# Inspect image details
docker inspect ubuntu
```

**Expected Output of `docker images`:**
```
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
ubuntu       latest    ...            ...           ...
nginx        latest    ...            ...           ...
hello-world  latest    ...            ...           ...
```

---

## Practical 3: Create, Run, Stop and Remove a Container

**Aim:** To demonstrate the Docker container lifecycle.

```bash
# Create and start a container in detached mode
docker run -d --name my-container nginx

# List only running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop the running container
docker stop my-container

# Restart a stopped container
docker start my-container

# Forcibly remove the container
docker rm -f my-container
```

**Explanation:**
- `docker run` — Creates AND starts a container
- `docker ps` — Lists running containers
- `docker ps -a` — Lists ALL containers (running + stopped)
- `docker stop` — Gracefully stops a container
- `docker start` — Restarts a stopped container
- `docker rm -f` — Forcibly removes the container

**Expected Result:** Students observe the container's status changing from *running* → *stopped* → *removed*.

---

## Practical 4: Run an Ubuntu Container Interactively

**Aim:** To execute Linux commands inside a Docker container on Windows.

```bash
# Run Ubuntu interactively with a bash shell
docker run -it --name ubuntu-container ubuntu bash

# Inside the container, try these commands:
ls
pwd
cat /etc/os-release
apt-get update
apt-get install -y curl
curl --version
exit

# After exit, remove the container
docker rm ubuntu-container
```

**Flags explained:**
- `-i` — Interactive mode (keeps STDIN open)
- `-t` — Allocates a pseudo-TTY (terminal)
- `bash` — The command to run inside the container

---

## Practical 5: Host a Website Using Nginx

**Aim:** To deploy a web server using Docker.

### Step 1: Start the web server
```bash
docker run -d -p 8080:80 --name my-nginx nginx
```

### Step 2: Open the website
Open your browser and visit: **http://localhost:8080**
You should see the Nginx welcome page.

### Step 3: Serve a custom page (optional)
```bash
# Run Nginx with your custom HTML page mounted
docker run -d -p 8080:80 --name my-nginx \
  -v "%cd%\DockerNginxLab:/usr/share/nginx/html:ro" nginx
```

### Step 4: Inspect the container
```bash
docker inspect my-nginx
docker logs my-nginx
docker stats my-nginx --no-stream
```

### Step 5: Stop and remove
```bash
docker stop my-nginx
docker rm my-nginx
```

**Real-world connection:** One command deploys a web server without manually installing and configuring Nginx on Windows.

---

## Practical 6: Build a Custom Docker Image using a Dockerfile

**Aim:** To create a custom image for a simple Python program.

**Folder:** `DockerPythonLab/`

**File 1 — `app.py`:**
```python
print("Hello from Docker!")
print("This Python app is running inside a Docker container.")
```

**File 2 — `Dockerfile`:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

**Build and run commands:**
```bash
cd DockerPythonLab

# Build the image and tag it
docker build -t my-python-app .

# Verify the image was created
docker images

# Run the container
docker run --name python-container my-python-app

# View container output after it exits
docker logs python-container

# Clean up
docker rm python-container
docker rmi my-python-app
```

**Expected Output:**
```
Hello from Docker!
This Python app is running inside a Docker container.
```

**Concepts demonstrated:** `FROM`, `WORKDIR`, `COPY`, `CMD` Dockerfile instructions, image building, tagging and container execution.

---

## Practical 7: Demonstrate Docker Volumes

**Aim:** To understand persistent data storage beyond a container's lifecycle.

```bash
# Create a named volume
docker volume create my-volume

# List all volumes
docker volume ls

# Run a container with the volume mounted
docker run -d --name vol-container \
  -v my-volume:/data \
  ubuntu bash -c "echo 'Persistent data!' > /data/hello.txt && sleep 3600"

# Read the file from inside the container
docker exec vol-container cat /data/hello.txt

# Stop and REMOVE the container
docker stop vol-container
docker rm vol-container

# Run a NEW container with the SAME volume — data persists!
docker run --rm -v my-volume:/data ubuntu cat /data/hello.txt

# Inspect the volume
docker volume inspect my-volume

# Clean up
docker volume rm my-volume
```

**Expected Result:** `Persistent data!` is printed even after the original container is deleted — proving data survived beyond the container's lifecycle.

---

## Practical 8: Demonstrate Docker Networking

**Aim:** To create a custom network for containers and enable inter-container communication.

```bash
# Create a custom bridge network
docker network create my-network

# List all networks
docker network ls

# Run container 1 on the custom network
docker run -d --name container1 --network my-network nginx

# Run container 2 on the same network
docker run -it --name container2 --network my-network ubuntu bash

# Inside container2 — ping container1 by name (DNS resolution)
apt-get update -qq && apt-get install -y iputils-ping -qq
ping container1 -c 4
exit

# Inspect the network
docker network inspect my-network

# Clean up
docker rm -f container1 container2
docker network rm my-network
```

**Key concept:** Containers on the same custom network can resolve each other **by container name** (Docker's built-in DNS). This is not possible with the default `bridge` network.

---

## Practical 9: Run a Container with Docker Compose

**Aim:** To launch an application service using a Compose configuration.

**Folder:** `DockerComposeLab/`

**File — `compose.yaml`:**
```yaml
services:
  web:
    image: nginx:latest
    container_name: compose-nginx
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
    restart: always
```

**Commands:**
```bash
cd DockerComposeLab

# Start all services defined in compose.yaml (detached mode)
docker compose up -d

# Check running services
docker compose ps

# View logs
docker compose logs web

# Open browser: http://localhost:8080

# Scale the web service to 3 replicas (remove container_name first)
# docker compose up -d --scale web=3

# Stop and remove all services
docker compose down

# Stop and also remove volumes
docker compose down -v
```

---

## Assessment Summary

| Practical | Topic | Status |
|-----------|-------|--------|
| 1 | Verify Docker Installation | ✅ Ready |
| 2 | Pull and List Images | ✅ Ready |
| 3 | Container Lifecycle | ✅ Ready |
| 4 | Ubuntu Interactive Container | ✅ Ready |
| 5 | Nginx Web Server | ✅ Ready |
| 6 | Custom Image with Dockerfile | ✅ Ready — `DockerPythonLab/` |
| 7 | Docker Volumes | ✅ Ready |
| 8 | Docker Networking | ✅ Ready |
| 9 | Docker Compose | ✅ Ready — `DockerComposeLab/` |

---

## Suggested Demo Order (Lab Session)

> Start with **Practicals 1, 3, 5, and 6** as recommended in the assignment.

1. **P1** — `docker run hello-world` (30 seconds, instant payoff)
2. **P3** — Full lifecycle demo (most educational)
3. **P5** — Deploy Nginx web server (visual, impressive)
4. **P6** — Build custom image from Dockerfile (teaches the full workflow)
5. **P7–P9** — Volume, Network, Compose (advanced concepts)
