const axios = require('axios');

const jiraApiToken = process.env.JIRA_API_TOKEN;
const jiraEmail = process.env.JIRA_EMAIL;
const jiraDomain = process.env.JIRA_DOMAIN;

const addComment = async (issueKey, comment) => {
  const url = `https://${jiraDomain}/rest/api/3/issue/${issueKey}/comment`;
  const auth = Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64');

  try {
    const response = await axios.post(
      url,
      { body: comment },
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`Comment added to issue ${issueKey}`);
  } catch (error) {
    console.error(`Failed to add comment to issue ${issueKey}:`, error.response ? error.response.data : error.message);
  }
}

module.exports = {
    jiraApiToken,
    jiraEmail,
    jiraDomain,
    addCommentToJiraFct: addComment,
};