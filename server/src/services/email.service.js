const nodemailer = require('nodemailer');

const { EMAIL_USER, EMAIL_PASS, FRONTEND_URL, EXPO_SCHEME } = process.env;
const APP_SCHEME = EXPO_SCHEME || 'akennesglow';

if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('CRITICAL: EMAIL_USER or EMAIL_PASS not set in environment variables — emails will not be sent.');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});
// Change the function to accept resetCode instead of resetToken
async function sendResetPasswordEmail({ to, resetCode }) {
    const mailOptions = {
        from: `"AkennesGlow Support" <${EMAIL_USER}>`,
        to,
        subject: 'Your Password Reset Code',
        text: `Your password reset code is: ${resetCode}. It expires in 15 minutes.`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Password Reset Request</h2>
                <p>Hello,</p>
                <p>You requested a password reset. Use the code below to verify your account:</p>
                <div style="font-size: 24px; font-weight: bold; color: #FF3B30; margin: 20px 0;">
                    ${resetCode}
                </div>
                <p style="font-size: 0.85em; color: #999;">This code expires in 15 minutes. If you did not request this, please ignore this email.</p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {
    sendResetPasswordEmail,
};