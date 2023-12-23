import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'santiagocattaneo01@gmail.com',
        pass: 'vzqjlruwungpozcc'
    }
});

app.get('/mail', async (req, res) => {
    await transporter.sendMail({
        from: 'Coder 55575',
        to: 'santicattaneo29@gmail.com',
        subject: 'Prueba 55575',
        html: 'Prueba de mailing desde node'
    })
    res.send('Correo enviado');
});

app.listen(8080, () => console.log('Listening on port 8080'));