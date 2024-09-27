# Use Node.js 16 and Debian Bullseye for broad compatibility with native modules
FROM node:16-bullseye

# Set working directory
WORKDIR /usr/src/app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    dumb-init \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Remove any local node_modules if mounted to prevent conflicts
RUN rm -rf node_modules
# Install nodemon globally
RUN npm install -g nodemon

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install Node.js dependencies, including sqlite3, and force rebuild of native modules
RUN npm install --build-from-source || { echo "npm install failed"; exit 1; }

# Copy application code
COPY . .

# Add write permissions to the database directory
RUN chmod 777 /usr/src/app/db

# Expose the application port
EXPOSE 3000

# Use dumb-init as the entry point for handling process signals
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the application using nodemon
CMD ["nodemon", "./src/index.js"]
