const axios = require('axios');
const _ = require('lodash/core');

const jiraApiToken = process.env.JIRA_API_TOKEN;
const jiraEmail = process.env.JIRA_EMAIL;
const jiraDomain = process.env.JIRA_DOMAIN;

const getProjects = async () => {
  const url = `https://${jiraDomain}/rest/api/3/project`;
  const auth = Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64');

  try {
    const response = await axios.get(
      url,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );


    if (response && response.data) {
      return _.map(response.data, (project) => {
        return {
          id: project.id,
          key: project.key,
          name: project.name,
        };
      });
    }

    return [];
  } catch (error) {
    console.error(
        `Failed to pull projects from jira for: ${jiraEmail}:`,
        error.response ? error.response.data : error.message
    );
  }
}

module.exports = {
    getProjectsFct: getProjects,
};