const getRandomUserForProject = async (projectId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT username FROM users WHERE project_id = ?`,
        [projectId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else if (rows.length > 0) {
            const randomUser = rows[Math.floor(Math.random() * rows.length)].username;
            resolve(randomUser);
          } else {
            resolve(null); // No user found for the project
          }
        }
      );
    });
};

module.exports = {
    functions: {
        getRandomUserForProject,
    }
};