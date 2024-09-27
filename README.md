
# Node.js Application with Docker and Jira Integration

This is a Node.js application that integrates with Jira to add comments and reviews for tasks. The app uses Docker for containerization and includes `dumb-init` for proper signal handling inside the container. It also uses `nodemon` for development, and the application mounts a SQLite database file for task tracking.

## Features

- Automatically adds comments to Jira tasks.
- Handles process management using `dumb-init` in Docker.
- Live reloading in development using `nodemon`.
- SQLite database (`sheclock_comm.db`) for tracking comments and tasks.

## Prerequisites

- [Docker](https://www.docker.com/) installed.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.
- Jira account for API integration.
- A `.env` file with Jira credentials.

## Environment Variables

Create a `.env` file in the root of your project with the following content:

```
JIRA_API_TOKEN="your-jira-api-token"
JIRA_EMAIL="your-jira-email"
JIRA_DOMAIN="your-jira-domain"
```

## Project Structure

```
/SHERLOCKCOMM
│   README.md
│   docker-compose.yml
│   package.json
│   package-lock.json
│   .env
│   /docker
│       Dockerfile
│   /src
│       ...
│   /db
│       sheclock_comm.db
```

## Running the Application

### Build and Run the Application Using Docker Compose

1. Clone this repository to your local machine.
2. The `sheclock_comm.db` file will be created in the location of the `db/` folder.
3. Run the following commands in your project root directory:

```bash
# Build the Docker image and start the application
docker-compose up --build  //it will be added later for production
# Build the Docker image and start the application for dev
docker compose -f docker-compose.debug.yml build --no-cache
docker compose -f docker-compose.debug.yml up
```

4. The application will be available at `http://localhost:3000` (or the port you specify in the Docker setup).

### Development Mode with Live Reloading

The application uses `nodemon` for live reloading during development. Any changes you make to the source code will automatically restart the application inside the Docker container.

### Accessing the SQLite Database

The SQLite database file (`sheclock_comm.db`) is mounted inside the Docker container. If you need to modify or query the database, you can do so by interacting with the file inside the `/db` folder.

## Additional Notes

- The Dockerfile is located in `./docker/Dockerfile`, and the `docker-compose.yml` handles the correct path setup.
- The application uses `dumb-init` for proper signal handling in Docker, preventing zombie processes and ensuring graceful shutdowns.

## Questions
- Ask Terry Ureche