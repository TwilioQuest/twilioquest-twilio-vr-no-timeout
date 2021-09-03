# Getting a programmable phone number

Navigate to the [phone number management interface](https://www.twilio.com/console/phone-numbers/incoming) in the Twilio console. You may use a phone number in this list to complete this challenge. Click the *+* button to purchase a phone number.

<center>
<img src="images/basic_training/buy-number.png"/>
</center>

Search for a phone number in the country or area code you prefer. Note that while it is possible to **deliver** SMS messages to nearly any mobile phone on the planet, Twilio does not have **local** phone numbers to use for SMS delivery in every country.

When you click "Search", you will see a list of available phone numbers. Choose one that is capable of sending and receiving SMS messages:

<center>
<img src="images/basic_training/search-for-number.png"/>
</center>

When you buy the phone number, you'll notice that doing so will debit some amount from your Twilio account (using either trial credits or your real funds) on a monthly basis. Remember that for new Twilio accounts, you can use the promo code `TWILIOQUEST` for \$50 USD of free API credits. You can upgrade your account and use this promo code [in the Billing section of the console](https://www.twilio.com/console/billing).

Please note, however, that you can complete TwilioQuest using only your free trial account. [Trial accounts have some restrictions](https://support.twilio.com/hc/en-us/articles/223136107-How-does-Twilio-s-Free-Trial-work-), but should work just fine as you learn the API in TwilioQuest.

Having obtained a programmable phone number, you are ready to take on many of the Twilio-related challenges in TwilioQuest!

## Clearing the barrier

Choose an SMS-capable phone number from [your inventory](https://www.twilio.com/console/phone-numbers/incoming). This can be an existing phone number in your account, or a new one that you just purchased. Enter the phone number into the text field on the right.

Phone numbers should be entered in [E.164 format](https://www.twilio.com/docs/glossary/what-e164) - you should plan on using this format when working with phone numbers in your Twilio apps and code going forward. The validator will only accept phone numbers in this format! For example, the US phone number "(651) 867-5309" would need to be entered as `+16518675309`.

When you click `HACK`, TwilioQuest will verify that this phone number is owned by your Twilio account. TwilioQuest will store this number for use in future challenges.
