import express from 'express';
import twilio from 'twilio';

const app = express();

const TWILIO_ACCOUNT_SID = '';
const TWILIO_AUTH_TOKEN = '';
const TWILIO_PHONE_NUMBER = '';
const TWILIO_WPP_PHONE_NUMBER = '';

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER);

app.get('/sms', async (req, res) => {
    await client.messages.create({
        from: TWILIO_PHONE_NUMBER,
        to: '',
        body: 'Prueba de twilio'
    });

    res.send('Mensaje enviado')
});

app.get('/sms-custom', async (req, res) => {
    const { name, product } = req.params;

    await client.messages.create({
        from: TWILIO_PHONE_NUMBER,
        to: '',
        body: `Gracias ${name}, tu solicitud del producto ${product} ha sido aprobada.`
    });

    res.send('Mensaje enviado')
});

app.get('/whatsapp', async (req, res) => {
    const { name, product } = req.params;

    await client.messages.create({
        from: TWILIO_WPP_PHONE_NUMBER,
        to: '',
        body: `Gracias ${name}, tu solicitud del producto ${product} ha sido aprobada.`
    });

    res.send('Whatsapp enviado')
});

app.listen(8080, () => console.log('Listening on port 8080'));