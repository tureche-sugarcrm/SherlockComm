require('dotenv').config();

const express = require('express');
const app = express();
const dbLite = require('./db/sqlite');
const {getProjectsFct} = require('./jira/getProjects');
const {getUsersFct} = require('./jira/getUsers');
const commentReplay = require('./api/commentReplay').commentReplayFct;
const {upsertProjectsFct} = require('./db/crud/projects');
const {upsertUsersFct} = require('./db/crud/users');
const {insertUsersProjectsFct} = require('./api/insertUsersProjects');

app.use(express.json());
app.post('/commentReplay', commentReplay);
app.post('/addProjectToUser', insertUsersProjectsFct);
app.get('/users', getUsersFct);

const fetchData = async () => {
  const users = await getUsersFct();
  await upsertUsersFct(users);

  const projects = await getProjectsFct();
  await upsertProjectsFct(projects);
}

(async () => {
  try {
    // Initialize the database
    await dbLite.init('./db/sherlock_comm.db');

    await fetchData();

    // Start the server only after the database has been initialized and data fetched
    app.listen(3000, () => {
      console.log('Server is running on port 3000');

    });
  } catch (err) {
    console.error('Failed to initialize the database:', err);
    process.exit(1);
  }
})();