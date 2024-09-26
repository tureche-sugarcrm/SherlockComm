const axios = require('axios');
const _ = require('lodash/core');

const jiraApiToken = process.env.JIRA_API_TOKEN;
const jiraEmail = process.env.JIRA_EMAIL;
const jiraDomain = process.env.JIRA_DOMAIN;

const getUsers = async () => {
  const url = `https://${jiraDomain}/rest/api/3/users/search?active=true`;
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

    const users = _.chain(response.data)
      .filter(user => user.accountType === 'atlassian')
      .map(user => ({
        accountId: user.accountId,
        displayName: user.displayName,
        email: user.emailAddress,
      }))
      .value();

    return users;
  } catch (error) {
    console.error(
        `Failed to pull projects from jira for: ${jiraEmail}:`,
        error.response ? error.response.data : error.message
    );
  }
}

module.exports = {
    getUsersFct: getUsers,
};