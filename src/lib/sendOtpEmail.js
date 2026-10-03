import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOtpEmail(toEmail, otpToken) {
  const mailOptions = {
    from: `"Your App Authentication" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your 6-Digit Verification Code",

    text: `Your login verification code is: ${otpToken}. This code expires in 5 minutes.`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        
        <h2 style="color: #333; text-align: center;">
          Verify Your Login
        </h2>

        <p style="font-size: 16px; color: #555;">
          Hello,
        </p>

        <p style="font-size: 16px; color: #555;">
          Use the following verification code to complete your authentication.
          This code remains valid for <strong>5 minutes</strong>.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 4px;
            color: #4F46E5;
            background-color: #F3F4F6;
            padding: 10px 24px;
            border-radius: 6px;
            border: 1px dashed #4F46E5;
          ">
            ${otpToken}
          </span>
        </div>

        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
          If you didn't request this verification code, you can safely ignore this email.
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}