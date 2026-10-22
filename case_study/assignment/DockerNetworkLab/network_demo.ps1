# Docker Networking — Practical 8
# Aim: Create a custom network and demonstrate inter-container communication by name (DNS)
#
# Run this script from the Docker_Assignment folder:
#   powershell -ExecutionPolicy Bypass -File DockerNetworkLab/network_demo.ps1

Write-Host "`n=== Practical 8: Docker Networking ===" -ForegroundColor Cyan
Write-Host "Aim: Containers on the same custom network can reach each other by NAME (not IP)`n" -ForegroundColor Gray

# Step 1: Create a custom bridge network
Write-Host "--- Step 1: Creating custom bridge network ---" -ForegroundColor Yellow
docker network create my-network
docker network ls

# Step 2: Start container1 on the custom network
Write-Host "`n--- Step 2: Starting container1 (nginx) on my-network ---" -ForegroundColor Yellow
docker run -d --name container1 --network my-network nginx
Write-Host "container1 is running"

# Step 3: Inspect to see the IP assigned
Write-Host "`n--- Step 3: container1 IP address ---" -ForegroundColor Yellow
docker inspect container1 --format "container1 IP: {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}"

# Step 4: From container2, ping container1 BY NAME (not by IP)
Write-Host "`n--- Step 4: container2 pings container1 by name (Docker DNS in action) ---" -ForegroundColor Yellow
Write-Host "Key point: We use 'container1' as hostname — Docker resolves it automatically!`n" -ForegroundColor Gray
docker run --rm --name container2 --network my-network ubuntu `
    bash -c "apt-get update -qq && apt-get install -y iputils-ping -qq 2>/dev/null && ping container1 -c 4"

# Step 5: Inspect the network — shows both containers
Write-Host "`n--- Step 5: Inspecting the network ---" -ForegroundColor Yellow
docker network inspect my-network --format "Network: {{.Name}} | Driver: {{.Driver}} | Containers: {{len .Containers}}"

# Cleanup
Write-Host "`n--- Cleanup ---" -ForegroundColor Yellow
docker rm -f container1
docker network rm my-network
Write-Host "`n✅ Practical 8 Complete!" -ForegroundColor Green
Write-Host "Key takeaway: Custom networks give containers automatic DNS — they resolve each other by container name.`n" -ForegroundColor Gray
