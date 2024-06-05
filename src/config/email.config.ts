import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import dotenv from 'dotenv'

dotenv.config();

const EmailVerificationProvider = async (email: string, otp: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, 
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_SENDER
        }
    } as SMTPTransport.Options);
    console.log("working check", email, otp)
    let mailOptions = {
        from: '"Your Company" <no-reply@example.com>',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
        html: `<p>Your OTP code is <b>${otp}</b></p>`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("this is mail option", mailOptions)
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
export default EmailVerificationProvider;
