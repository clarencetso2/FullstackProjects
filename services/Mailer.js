const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail{
  constructor({subject,recipients},content){
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email(keys.sendGridSenderEmail);
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    //register body with Mailer this is Mailer function
    this.addContent(this.body);
    //allowes user to click on link
    //which links back to unique sendgrid link
    this.addClickTracking();
    //similar to helper addContent
    this.addRecipients();
  }

  //foreach email in recipients
  //create new sedgrid email to send to
  //return array of helper Email objects
  formatAddresses(recipients){
    return recipients.map(({email}) => {
      return new helper.Email(email);
    });
  }

  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true,true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients(){
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient =>{
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  //convert variables to JSON
  async send(){
    const request = this.sgApi.emptyRequest({
      method:'POST',
      path:'/v3/mail/send',
      body: this.toJSON()

    });
    const response  = await this.sgApi.API(request);
    return response;
  }
}



module.exports = Mailer;
