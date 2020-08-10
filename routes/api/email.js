const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config/keys').jwtSecret2;
const emailAuth = require('../../middleware/email');

router.post('/', emailAuth, (req, res) => {
    console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    const output = `
        <p>You have received a new message from the Eternal Chefs website.</p>
        <h3>Contact Details</h3>
        <div>Name: ${req.body.name}</li>
        <div>Email: ${req.body.email}</li>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wilsonduan10@gmail.com', // generated ethereal user
            pass: 'soccer833'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"EternalChefs Website Message" <wilsonduan10@gmail.com>', // sender address
        to: 'wilsonduan10@gmail.com', // list of receivers
        subject: 'Message from eternalchefs.herokuapp.com', // Subject line
        text: 'Hello world', // plain text body
        html: output // html body
    };


    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(400).json({ msg: 'Email fail' });
        }
        console.log('Message sent: %s', info.messageId);   
        
        jwt.sign(
            { email_id: 'emailToken'},
            jwtSecret,
            { expiresIn: 60 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                })
            }
        )
    });
});

module.exports = router;