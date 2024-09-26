const axios = require('axios');

const { markCommentAddedFct, isCommentAlreadyAddedFct } = require('./../db/crud/taskComments');
const {selectRandomUserForProjectFct} = require('../db/crud/users');
const jira = require('../jira/addComment');
const addCommentToJiraFct = jira.addCommentToJiraFct;

const commentReplay = async(req, res) => {
  const data = req.body;

  const targetStatusFrom = 'To Do';
  const targetStatusTo = 'Done';

  if (data.webhookEvent === 'jira:issue_updated') {
    const issue = data.issue;
    const changelog = data.changelog;
    const projectKey = issue.fields.project.key;
    const taskId = issue.id;

    const asigneed = issue.fields.assignee;
    const user = data.user;

    const statusChange = changelog.items.find(item => item.field === 'status');

    if (statusChange && statusChange.fromString === targetStatusFrom && statusChange.toString === targetStatusTo) {
      console.log(`Issue ${issue.key} moved from To Do to Done`);

      // Check if the comment has already been added
      const commentAdded = await isCommentAlreadyAddedFct(taskId, projectKey);

      if (!commentAdded) {
        const userDetails = await selectRandomUserForProjectFct(projectKey, asigneed.accountId);
        if (userDetails) {
          const comment = getUserMentionComment(userDetails.id, userDetails.username);
          // Add the comment to the issue
          await addCommentToJiraFct(issue.key, comment);

          // Mark the task as commented in the database
          markCommentAddedFct(taskId, projectKey);
        } else {
          console.log(`No users found for project ${projectKey}`);
        }
      } else {
        console.log(`Comment already added for issue ${issue.key}`);
      }
    }
  }

  res.status(200).send();
}

const getUserMentionComment = (userId, displayName) => {
  return {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'mention',
              attrs: {
                id: userId,
                text: displayName
              }
            },
            {
              type: 'text',
              text: ', please take a look.'
            }
          ]
        }
      ]
  };
}

module.exports = {
    commentReplayFct: commentReplay,
};