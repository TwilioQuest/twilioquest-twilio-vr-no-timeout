const levelInfo = require('./level.json');
const LEVEL = 'basic_training';
const TITLE = 'VR Training: Twilio API Setup';

module.exports = function(event, world) {
  let levelComplete = true, description = '';
  for (let i = 0, l = levelInfo.objectives.length; i<l; i++) {
    let objectiveKey = levelInfo.objectives[i];
    if (!world.isObjectiveCompleted(objectiveKey, LEVEL)) {
      levelComplete = false; break;
    }
  }

  if (levelComplete) {
    description = `
      You have successfully configured your Twilio account!
    `;
  } else {
    description = `
      Clear all barriers, then proceed onward to learn more about key Twilio 
      APIs.
    `;
  }

  world.updateQuestStatus(LEVEL, TITLE, description, levelComplete);
};
