module.exports = async helper => {
  const whatsappPrefix = helper.getNormalizedInput('whatsappPrefix');

  if (whatsappPrefix !== 'whatsapp:') {
    return helper.fail(`
      Please enter the prefix of all WhatsApp numbers - it starts with a "w"
      and ends with a ":"
    `);
  }

  try {
    const client = helper.getTwilioClient();
    const messages = await client.messages.list({ limit: 100 });
    const inboundFound = messages.find(
      msg => msg.direction === 'inbound' && msg.to.includes('whatsapp:')
    );

    const outboundFound = messages.find(
      msg => msg.direction === 'outbound-api' && msg.from.includes('whatsapp:')
    );

    if (!inboundFound) {
      throw `
        We looked for an inbound message to your WhatsApp sandbox, but couldn't
        find any messages. Complete the onboarding flow first, then click 
        "HACK".
      `;
    }
    if (!outboundFound) {
      throw  `
        We looked for an outbound message to from WhatsApp sandbox, but couldn't
        find any messages. Complete the onboarding flow first, then click 
        "HACK".
      `;
    }

    // If we have seen both inbound and outbound whatsapp messages we can
    // assume they are set up
    helper.success(`
      Woot! It looks like you've successfully set your development sandbox 
      for WhatsApp. You know what's app with this.
    `);
  } catch (e) {
    helper.fail(e);
  }
};
