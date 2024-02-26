import nodemailer from 'nodemailer';
import config from '../config/config.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.userNodemailer,
        pass: config.passNodemailer
    }
});

export const sendEmail = async (email) => {
    await transporter.sendMail({
        from: 'Proyecto Ecommerce 55575',
        to:  email.to,
        subjet: email.subjet,
        html: email.html
    });
};