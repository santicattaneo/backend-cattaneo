import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ exttended: true }));

//setear middleware de cookieparser nivel app
app.use(cookieParser('Coder5575secret'));

//setear una cookie
app.get('/cookies', (req, res) => {
    res.cookie('CoderCookie', 'This is a to powerfull cookie', { maxAge: 30000 }).send('Cookie successfully configured');
});

//obtener cookies
app.get('/all-cookies', (req, res) => {
    res.send(req.cookies);
});

//eliminar manualmente una cookie
app.get('/delete-cookies', (req, res) => {
    res.clearCookie('CoderCookie').send('Cookie successfully eliminated');
});

//firmar coockie (invalidar la cookie en caso de que sea modificada)
app.get('/set-signed-cookie', (req, res) => {
    res.cookie('CoderSignedCookie', "This is a signed to powerfull cookie", { maxAge: 30000, signed: true }).send('Cookie successfully signed');
});

//obtener cookies firmadas
app.get('/all-signed-cookies', (req, res) => {
    res.send(req.signedCookies);
});

app.listen(8080, () => console.log('Listening on port 8080'));