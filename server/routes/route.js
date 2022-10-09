const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/test", (req, res) => {
  res.send("hello world");
});

router.post("/sendmail", async function (req, res) {
  const sn = req.body.sn;
  const se = req.body.se;
  const arr = [req.body.arr];
  const sub = req.body.sub;
  const tex = req.body.tex;
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
  });
  let emailPromiseArray = [];
  for (let i = 0; i < arr.length; i++) {
    emailPromiseArray.push(
      sendMail({
        from: `${sn} <${se}>`,
        to: arr[i],
        subject: sub,
        text: tex,
      })
    );
  }
  Promise.all(emailPromiseArray)
    .then((result) => {
      console.log("all mail completed");
      let success = true;
      let es = "emailsent";
      res.json({ success, es });
    })
    .catch((error) => {
      console.log(error);
    });

  function sendMail(mail) {
    return new Promise((resolve, reject) => {
      smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.table("Message sent: " + JSON.stringify(response));
          resolve(response);
        }
        smtpTransport.close();
      });
    });
  }
});

module.exports = router;