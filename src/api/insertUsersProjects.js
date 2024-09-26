const {insertRecordFct} = require('./../db/crud/usersProjects');

const insertUsersProjects = async(req, res) => {
  const data = req.body;

  const {userId, projectId} = data;

  if (!userId || !projectId) {
    return res.status(400).json({ error: "'userId' and 'projectId' are required." });
  }

  const resp = await insertRecordFct(userId, projectId);

  if (resp.success) {
    return res.status(200).json({ message: resp.message });
  } else {
    return res.status(500).json({ error: resp.message });
  }
}

module.exports = {
    insertUsersProjectsFct: insertUsersProjects,
};