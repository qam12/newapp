



## ⚙️ Docker Setup

### 🧰 Prerequisites

- Ensure **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** is installed and running:
  - 📦 [Download for macOS](https://docs.docker.com/desktop/install/mac-install/)
  - 📦 [Download for Windows](https://docs.docker.com/desktop/install/windows-install/)

### 🔨 Build & Run the Docker Container

```
docker-compose up --build
```

## 🛠️ Docker Troubleshooting

If you're having issues running the app with Docker, here are some common solutions:

### 1. Docker Daemon Not Running
Make sure Docker Desktop is installed and running before executing Docker commands.

- On Windows/macOS: Open Docker Desktop and wait for it to initialize.
- On Linux: Run `sudo systemctl start docker` if it's not running.

### 2. Port Already in Use
You may see an error like:

- This means the specified port (e.g., `3000`) is already in use.
- Solution: Stop the conflicting service or change the port in `docker-compose.yml`.

### 3. .env File Not Loaded
If environment variables aren't being picked up:

- Make sure your `.env` file is in the **project root**.
- Ensure variable names start with `REACT_APP_` for React apps.
- Rebuild the container:
  ```
  docker-compose down
  docker-compose up --build
  ```
