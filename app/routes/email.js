
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv").config();

module.exports = function (app) {
    app.post("/api/sendemail", function (req, res) {
        // *********email to owner********
        sgMail.setApiKey("" + process.env.API_KEY + "");
        const msg = {
            to: process.env.EMAIL,
            from: "Lemmonscreative_Contact@Lemmonscreative.com",
            subject: "A message from Lemmonscreative website!",
            html:
                "<p>name:" +
                req.body.name +
                "</p><p>email: " +
                req.body.email +
                "</p><p>message: " +
                req.body.message +
                "</p>"
        };
        sgMail.send(msg);

        sendThankyou(req.body);
        res.end();
    });

    function sendThankyou(client) {
        // *****thank you email to submission******
        sgMail.setApiKey("" + process.env.API_KEY + "");
        const msg = {
            to: client.email,
            from: "Mike_Lemmonscreative@Lemmonscreative.com",
            subject: "Thank you for reaching out!",
            html:
                "Hi " +
                client.name +
                ",<p> Thank you for reaching out. I will be sure to respond back to as soon as possible through the email you provided.</p><p>Please take a moment and confirm the information you entered is correct. If not, please create a new submission at <a href='mike.lemmonscreative.com/#contact'> mike.lemmonscreative.com</a></p><p>name:" +
                client.name +
                "</p><p>email: " +
                client.email +
                "</p><p>message: " +
                client.message +
                "</p>"
        };
        sgMail.send(msg);
    }
};