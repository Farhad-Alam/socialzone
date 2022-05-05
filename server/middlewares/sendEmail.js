import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

// host: process.env.SMTP_HOST,
// port: process.env.SMTP_PORT,
// auth: {
//   user: process.env.SMTP_USER,
//   pass: process.env.SMTP_PASS,
// },

// host: "smtp.mailtrap.io",
// port: 2525,
// auth: {
//   user: "234abe16e1d728",
//   pass: "83070f56d3612e",
// }
