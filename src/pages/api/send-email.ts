import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html)
      return res.status(400).json({ error: "Missing required fields" });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      tls: { ciphers: "SSLv3" },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `Connect Acqua Kids <${process.env.SMTP_FROM_EMAIL}>`,
      to: to as string,
      subject: subject as string,
      html: html as string,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error)
        res.status(500).json({ error: "Failed to send email", details: error });
      res
        .status(200)
        .json({ message: "Email sent successfully", details: info });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
