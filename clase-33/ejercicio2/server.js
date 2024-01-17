import express from 'express';

const app = express();

app.get('/test', (req, res) => {
    res.send('Servicio de prueba');
});

app.listen(8080, () => console.log('Listening on port 8080'));