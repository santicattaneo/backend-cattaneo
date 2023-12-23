import express from 'express';
import contactsRouter from './routes/contacts.router.js';

const app = express();

app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.listen(8080, () => console.log('Listening on port 8080'));