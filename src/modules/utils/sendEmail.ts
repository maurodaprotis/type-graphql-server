import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
  if (process.env.NODE_ENV === "test") return;
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<a href="${url}">${url}</a>`
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview url: ${nodemailer.getTestMessageUrl(info)}`);
}
