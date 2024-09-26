const dbLite = require('./../sqlite');

const markCommentAdded = async (taskId, projectId) => {
    try {
      await new Promise((resolve, reject) => {
        dbLite.getDB().run(
          `INSERT OR REPLACE INTO task_comments (task_key, project_id, comment_added) VALUES (?, ?, 1)`,
          [taskId, projectId],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
      console.log(`Comment marked as added for task ${taskId} in project ${projectId}`);
    } catch (err) {
      console.error(`Failed to mark comment as added: ${err.message}`);
    }
};

const isCommentAlreadyAdded = async (taskId, projectId) => {
    try {
      const row = await new Promise((resolve, reject) => {
        dbLite.getDB().get(
          `SELECT 1 FROM task_comments WHERE task_key = ? AND project_id = ? AND comment_added = 1`,
          [taskId, projectId],
          (err, row) => (err ? reject(err) : resolve(row))
        );
      });
      return !!row;
    } catch (err) {
      throw new Error(`Error checking if comment was added for task ${taskId} and project ${projectId}: ${err.message}`);
    }
};

module.exports = {
    markCommentAddedFct: markCommentAdded,
    isCommentAlreadyAddedFct: isCommentAlreadyAdded,
};