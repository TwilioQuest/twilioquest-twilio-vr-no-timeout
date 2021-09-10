const levelInfo = require('./level.json');
const LEVEL = 'programmable_voice';
const TITLE = 'VR Training: Twilio Voice';

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
      You have demonstrated exemplary skill with the Twilio Voice API!
    `;
  } else {
    description = `
      Clear all barriers and open all chests to learn more about the Voice 
      APIs.
    `;
  }

  world.updateQuestStatus(LEVEL, TITLE, description, levelComplete);
};
