const dbLite = require('./../sqlite');

const getRandomUserForProject = async (projectId, currentAssignee) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      dbLite.getDB().all(
        `SELECT
          u.id as userId,
          u.display_name as username
         FROM
          users u
         JOIN
          user_projects up ON u.id = up.user_id
         WHERE
            up.project_id = ?
          AND
            u.id <> ?`,
        [projectId, currentAssignee],
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });

    if (rows.length < 1) {
      return false; // no user found
    }

    const randomUser = rows[Math.floor(Math.random() * rows.length)];

    return {
      id: randomUser.userId,
      username: randomUser.username,
    };

  } catch (err) {
    throw new Error(`Error fetching user for project ${projectId}: ${err.message}`);
  }
};

const upsertUsers = async (users) => {
  try {
    const data = [];

    for (const user of users) {
      data.push(
        new Promise((resolve, reject) => {
          dbLite.getDB().run(
            `INSERT OR REPLACE INTO users (id, display_name, email, date_created, date_modified)
             VALUES (?, ?, ?, datetime('now'), datetime('now'))`,
            [user.accountId, user.displayName, user.email],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(user); // Resolve with the user object for potential later use
              }
            }
          );
        })
      );
    }

    const results = await Promise.all(data);

    return results;
  } catch (err) {
    throw new Error(`Error inserting/updating users: ${err.message}`);
  }
};


module.exports = {
  selectRandomUserForProjectFct: getRandomUserForProject,
  upsertUsersFct: upsertUsers,
};