const saxrollEmbed = `
<style>
  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    margin-top: 10px;
    padding-top: 30px; height: 0; overflow: hidden;
  }
  
  .video-container iframe,
  .video-container object,
  .video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 180px;
  }
</style>
<div class="video-container">
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/6jKGzfhO0so?autoplay=1&showinfo=0&modestbranding=1" 
    frameborder="0" 
    allow="accelerometer; autoplay; encrypted-media; picture-in-picture">
  </iframe>
</div>
`;

module.exports = helper => {
  const { sessionLength } = helper.validationFields;
  const { sessionStart } = helper.validationFields;
  const { template } = helper.validationFields;

  if (!sessionLength) {
    return helper.fail(`Alas, ignoring the session doesn't make the constraint go away.
      Please enter your the session length.`);
  } else if (!sessionStart) {
    return helper.fail(`It can't be both: True or False, please`);
  } else if (!template) {
    return helper.fail(
      `You must guess the false template. There are only three.`
    );
  }

  if (sessionLength !== '24') {
    return helper.fail(
      `Sorry, that's not the right number. Did you enter it in HOURS?`
    );
  } else if (sessionStart.toLowerCase() === 'true') {
    return helper.fail(
      `Not quite: Remember that the session restarts every time a user sends you a message.`
    );
  } else if (template !== '3') {
    return helper.fail(
      `Oops, review the templates in the Help section again.`
    );
  } else {
    helper.success(`Yep, you got it!`);
  }
};
