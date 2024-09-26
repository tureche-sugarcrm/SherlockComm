const dbLite = require('./../sqlite');

const insertRecord = async (userId, projectId) => {
    try {
        await new Promise((resolve, reject) => {
            dbLite.getDB().run(
                `INSERT OR REPLACE INTO user_projects (user_id, project_id, date_created, date_modified)
                VALUES (?, ?, datetime('now'), datetime('now'))`,
                [userId, projectId],
                function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
                }
            );
        });

        const message = `Success to inserte/update: ${userId}, ${projectId} into user_projects`;

        return {
            success: true,
            message
        };
    } catch (err) {
        const message = `Failed to inserted/updated: ${userId}, ${projectId} into user_projects: ${err.message}`;

        console.error(message);

        return {
            success: false,
            message
        };
    }
};

module.exports = {
    insertRecordFct: insertRecord,
};