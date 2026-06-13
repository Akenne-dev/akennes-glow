const nodemailer = require('nodemailer');

const { EMAIL_USER, EMAIL_PASS, FRONTEND_URL, EXPO_SCHEME } = process.env;

if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('EMAIL_USER or EMAIL_PASS not set — emails will not be sent');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

async function sendResetPasswordEmail({ to, resetToken }) {
    // deep link to app using scheme (e.g. akennesglow://reset-password?token=...)
    const scheme = EXPO_SCHEME || 'akennesglow';
    const appLink = `${scheme}://reset-password?token=${resetToken}`;
    const webFallback = FRONTEND_URL ? `${FRONTEND_URL}/reset-password/${resetToken}` : `http://localhost:19006/reset-password/${resetToken}`;

    const resetLink = `${appLink}`;

    const mailOptions = {
        from: EMAIL_USER,
        to,
        subject: 'Reset Your Password',
        text: `Hello,\n\nYou requested a password reset.\n\nClick the link below:\n\n${resetLink}\n\nIf that doesn't open in the app, visit:\n\n${webFallback}\n\nThis link expires in 25 minutes.\n\nIf you did not request this, please ignore this email.`,
        html: `<p>Hello,</p><p>You requested a password reset.</p><p>Click the link below:</p><p><a href="${webFallback}">Reset Password</a></p><p>If you opened this on mobile, try this link to open the app: <a href="${resetLink}">Open App</a></p><p>This link expires in 25 minutes.</p><p>If you did not request this, please ignore this email.</p>`,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {
    sendResetPasswordEmail,
};
