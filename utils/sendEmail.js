import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email send failed:", {
      code: error.code,
      responseCode: error.responseCode,
      response: error.response,
      message: error.message,
    });
    throw error;
  }
};

export const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("SMTP transporter ready");
  } catch (error) {
    console.error("SMTP verify failed:", error.message);
  }
};
