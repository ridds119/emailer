const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

exports.emailer = functions.https.onRequest(async (request, response) => {
  console.log('Emailer Request body: ' + JSON.stringify(request.body))

  const html = request.body.html
  const session_id = request.body.session_id
  console.log('HTML PARAMS   ' + html)
  console.log('SESSION ID PARAMS ' + session_id)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rhapsodyautomatedcallservice@gmail.com',
      pass: 'rhapsody123'
    }
  })

  var mailOptions = {
    from: 'rhapsodyautomatedcallservice@gmail.com',
    to: 'riddhik@mindfiresolutions.com',
    subject: `Session ID: ${session_id}`,
    html: html,
  }

  let email = await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
  console.log('email res: ' + email)
  // async..await is not allowed in global scope, must use a wrapper
  // async function main () {
  //   // Generate test SMTP service account from ethereal.email
  //   // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount()

  //   // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //     host: 'gmail.com',
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: 'rhapsodyautomatedcallservice@gmail.com', // generated ethereal user
  //       pass: 'rhapsody123' // generated ethereal password
  //     }
  //   })

  //   // send mail with defined transport object
  //   let info = await transporter.sendMail({
  //     from: 'rhapsodyautomatedcallservice@gmail.com', // sender address
  //     to: 'riddhik@mindfiresolutions.com', // list of receivers
  //     subject: `Session ID: ${session_id}`, // Subject line
  //     html: html // html body
  //   })

  //   console.log('Message sent: %s', info.messageId)
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //   // Preview only available when sending through an Ethereal account
  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  //   response.status(200).send(request.body)
  // }

  // main().catch(console.error)
})
