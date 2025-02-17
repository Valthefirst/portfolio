import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD, 
        
      },
      authMethod: 'PLAIN'
    });
    console.log(process.env.MAIL_USERNAME, process.env.MAIL_PASSWORD);

    const mailOptions = {
      from: `"Your Name" <${process.env.MAIL_USERNAME}>`, 
      to: email, 
      subject: subject, 
      text: message, 
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

