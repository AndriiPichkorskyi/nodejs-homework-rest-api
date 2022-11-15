const app = require("./app");
const chalk = require("chalk");
require("dotenv").config();
const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

console.log("process.env.SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "andriipichkorkiy@ukr.net", // Change to your recipient
  from: "andriipichkorkiy@ukr.net", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    // console.error(error);
    console.error(error.body.errors);
  });
