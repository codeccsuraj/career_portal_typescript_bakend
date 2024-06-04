import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import dotenv from 'dotenv'

dotenv.config();

const EmailVerificationProvider = async (email: string, otp: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // or 'STARTTLS'
        auth: {
            user: 'raajrawat221@gmail.com',
            pass: 'jvpc jltk lqhs tdjt'
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
