

const domain = 'https://api.mailgun.net/v3/kvmac.com/messages';
// const mailgunSdk = require('mailgun-js');
const mailgun = require('mailgun-js')({
  username: 'api',
  apiKey: process.env.MAILGUN_API_KEY,
});
// const apiKey = process.env.MAILGUN_API_KEY;
// const mailgun = mailgunSdk({ apiKey, domain });



export async function handler(event, context, callback) {
  try {
    console.log('------------- event:  ', event, '       typeof:  ', typeof event);
    // const event = JSON.parse(event);
    let data = event.body;

    // if(!data.from
    //   || !data.subject
    //   || !data.text) {
    //     console.log('body:  ', data, '  type:  ', typeof(data));
    //     console.log('MADE INTO NULL CHECK', 'from: ',data.from, '... subject: ', data.subject, '... text: ', data.text);
    //   return;
    // }
    data.to = 'kodee.mcintosh@kvmac.com';
    data = JSON.stringify(data);

    console.log('NEW CALL ----------------------------------------');
    console.log('body:  ', data, '  type:  ', typeof(data));
    console.log('MADE INTO HANDLER', 'from: ', data.from, '... subject: ', data.subject, '... text: ', data.text);

    let res = await mailgun.messages().send(domain, data)
    .then((res) => console.log(res)) // logs response data
    .catch((err) => console.warn(err)); // logs any error
    console.log('response:  ', res);

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: {
          statusText: res.statusText
        }
      };
    }

    return {
      statusCode: 200,
      message: 'Hey, wazzup, Boi??? Your data made it into the function',
      event
    };
  } catch(err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}