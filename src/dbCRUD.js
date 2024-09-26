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
}

function markCommentAdded(taskId, projectId) {
    db.run(
      `INSERT OR REPLACE INTO task_comments (task_key, project_id, comment_added) VALUES (?, ?, 1)`,
      [taskId, projectId]
    );
}

module.exports = {
    functions: {
        getRandomUserForProject,
    }
};