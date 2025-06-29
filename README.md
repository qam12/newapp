###  Environment Variables

```
REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key  
REACT_APP_NYT_API_KEY=your_nyt_api_key  
REACT_APP_NEWS_API_KEY=your_news_api_key
```

In the project root, create a `.env` file with the following content:

### Environment Troubleshooting

If you're facing issues running the app, here are some common checks:

1. **Environment Variables Not Working**
   - Ensure the `.env` file is placed in the **project root directory**.
   - Make sure there are **no spaces around the `=`** sign.
   - Do **not add quotes** around the API keys.
   - Restart the development server after making changes to the `.env` file.

2. **.env File Not Being Picked Up**
   - Verify that the file is named **exactly** `.env` (no extensions or typos).
   - Check that you're not committing it accidentally — it should be listed in `.gitignore`.

3. **Build Fails or API Key Errors**
   - Double-check that all required keys (`REACT_APP_*`) are present in `.env`.
   - Ensure your API keys are **active and not expired**.
   - Make sure you're using the correct prefix: `REACT_APP_` is required for React to expose them.

4. **Still Not Working?**
   - Try deleting `node_modules` and `package-lock.json`, then reinstall dependencies:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```

5. **Check Console Logs**
   - Open your browser's dev tools (F12) and check for any relevant error messages in the **Console** or **Network** tabs.

##  Docker Setup

###  Prerequisites

- Ensure **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** is installed and running:
  - [Download for macOS](https://docs.docker.com/desktop/install/mac-install/)
  - [Download for Windows](https://docs.docker.com/desktop/install/windows-install/)

### 🔨 Build & Run the Docker Container

```
docker-compose up --build
```

###  Docker Troubleshooting

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
