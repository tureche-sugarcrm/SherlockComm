const dbLite = require('./../sqlite');

const upsertProjects = async (projects) => {
  try {
    const data = [];

    for (const project of projects) {
      data.push(
        new Promise((resolve, reject) => {
          dbLite.getDB().run(
            `INSERT OR REPLACE INTO projects
              (id, project_key, project_name, date_created, date_modified)
            VALUES
              (?, ?, ?, datetime('now'), datetime('now'))`,
            [project.id, project.key, project.name],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(project); // Resolve with the project object for potential later use
              }
            }
          );
        })
      );
    }

    const results = await Promise.all(data);

    return results;
  } catch (err) {
    throw new Error(`Error fetching user for project ${projectId}: ${err.message}`);
  }
};

module.exports = {
    upsertProjectsFct: upsertProjects,
};