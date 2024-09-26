const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    display_name TEXT,
    email TEXT,
    date_created TEXT DEFAULT (datetime('now')),
    date_modified TEXT DEFAULT (datetime('now'))
  );
`;

const indexUsers = {
  'email': 'CREATE INDEX IF NOT EXISTS idx_email_users ON users(email)',
};

const createProjects = `
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    project_key TEXT,
    project_name TEXT,
    date_created TEXT DEFAULT (datetime('now')),
    date_modified TEXT DEFAULT (datetime('now'))
  )
`;

const indexProjects = {
  'project_key': 'CREATE INDEX IF NOT EXISTS idx_project_key_projects ON projects(project_key)',
};

//INSERT INTO user_projects (user_id, project_id) VALUES ('user-id', 'project-id');

// SELECT p.project_name 
// FROM projects p
// JOIN user_projects up ON p.project_id = up.project_id
// WHERE up.user_id = 'user-id';

const createUserProjects = `
  CREATE TABLE IF NOT EXISTS user_projects (
    user_id TEXT,
    project_id TEXT,
    date_created TEXT DEFAULT (datetime('now')),
    date_modified TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, project_id)
  )
`;

const indexUserProjects = {
  'user_id': 'CREATE INDEX IF NOT EXISTS idx_user_id_user_projects ON user_projects(user_id)',
  'project_id': 'CREATE INDEX IF NOT EXISTS idx_project_id_user_projects ON user_projects(project_id)',
};

const createTaskComments = `
  CREATE TABLE IF NOT EXISTS task_comments (
    task_key TEXT,
    project_id TEXT,
    comment_added BOOLEAN DEFAULT 0,
    date_created TEXT DEFAULT (datetime('now')),
    date_modified TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (task_key, project_id)
  )
`;

const indexTaskComments = {
  'project_id': 'CREATE INDEX IF NOT EXISTS idx_project_id_task_comments ON task_comments(project_id)',
  'comment_added': 'CREATE INDEX IF NOT EXISTS idx_comment_added_task_comments ON task_comments(comment_added)',
};


module.exports = {
  createUsers,
  createProjects,
  createUserProjects,
  createTaskComments,
  indexUsers,
  indexProjects,
  indexUserProjects,
  indexTaskComments
};