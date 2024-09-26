const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');
const {
  createUsers,
  indexUsers,
  createProjects,
  indexProjects,
  createUserProjects,
  indexUserProjects,
  createTaskComments,
  indexTaskComments
} = require('./dbInit');

class DatabaseSingleton {
  constructor() {
    if (!DatabaseSingleton.instance) {
      this.db = null;

      DatabaseSingleton.instance = this;
    }
    return DatabaseSingleton.instance;
  }

  async init(dbPath) {
    await this.connectToDatabase(dbPath);

    await this.initializeDatabase();
  }

  connectToDatabase(dbPath) {
    return new Promise((resolve, reject) => {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error("Error opening database", err.message);

                reject(err);
            } else {
                console.log("Connected to the database.");

                resolve();
            }
        });
    });
  }

  async initializeDatabase() {
    try {
      const run = promisify(this.db.run.bind(this.db));

      await run(createUsers);
      console.log('users table created if not exists.');

      await run(createProjects);
      console.log('projects table created if not exists.');

      await run(createUserProjects);
      console.log('user_projects table created if not exists.');

      await run(createTaskComments);
      console.log('task_comments table created if not exists.');

      await run(indexUsers.email);
      console.log('Index (idx_project_key_projects) on users created if not exists.');

      await run(indexProjects.project_key);
      console.log('Index (idx_project_key_projects) on users created if not exists.');

      await run(indexUserProjects.user_id);
      console.log('Index (user_id) on user_projects created if not exists.');

      await run(indexUserProjects.project_id);
      console.log('Index (project_id) on user_projects created if not exists.');

      await run(indexTaskComments.project_id);
      console.log('Index (project_id) on task_comments created if not exists.');

      await run(indexTaskComments.comment_added);
      console.log('Index (comment_added) on task_comments created if not exists.');

    } catch (err) {
      console.error('Error during database initialization:', err.message);
    }
  }

  getDB() {
    return this.db;
  }
}

const databaseInstance = new DatabaseSingleton();

module.exports = databaseInstance;
