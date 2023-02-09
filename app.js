const express = require('express')
const router = require('./routers')
const app = express()
const port = 3000
const session = require('express-session')

const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'agif n fahri',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))
app.use(router);

app.post('/email', async (req, res) => {
  const {email} = req.body;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'shanny.armstrong@ethereal.email',
        pass: '9VJjjSEV6R2hTmyAM8'
    }
  });
  
  const msg = {
      from: '"The Exapress App" <theExpressApp@example.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Sup", // Subject line
      text: "Long time no see", // plain text body
  }
  // send mail with defined transport object
  const info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  
  res.send('Email Sent!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})