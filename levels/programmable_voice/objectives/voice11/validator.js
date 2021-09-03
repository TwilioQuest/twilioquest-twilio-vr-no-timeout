// FIXME: This is a little wonky based on checkboxes not working just quite yet
function isChecked(helper, fieldName) {
  const val = helper.validationFields[fieldName];
  // This is making sure the field is not empty
  return val !== undefined && val.trim() !== '';
}

module.exports = async function(helper) {
  try {
    if (isChecked(helper, 'redirect')) {
      throw `Whoops! Remember when a redirect happens, it moves immediately to the next TwiML, the remaining lines are not executed`;
    }
    if (!isChecked(helper, 'helloWorld')) {
      throw `Whoops, the line before the redirect would be ran. TwiML happens in order.`;
    }
    if (!isChecked(helper, 'helloCloud')) {
      throw `Whoops this is not a trick question. &lt;Redirect&gt; can work with relative links like /hello-cloud. Hello Cloud would be said.`;
    }

    helper.success('Way to redirect your attention to the answers!');
  } catch (e) {
    helper.fail(e);
  }
};
