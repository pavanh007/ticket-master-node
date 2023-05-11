import { createTransport } from 'nodemailer';

export async function sendEmail(options){
  //1. Create a transporter
var transport = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
  //2. Define email options
  const mailOptions = {
    from: 'pavan h <ticketmaster@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  //3. send email with nodemailer
  await transport.sendMail(mailOptions);
};

export default sendEmail;
