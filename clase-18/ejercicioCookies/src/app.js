import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import __dirname from './utils.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ exttended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(cookieParser('Coder5575secret'));

app.get('/', (req, res) => {
    res.render('cookies');
});

app.post('/cookie', (req, res) => {
    const data = req.body;
    res.cookie('CoderCookie', data, { maxAge: 10000 }).send({ status: 'success', message: 'Cookie successfully configurated'});
});

app.listen(8080, () => console.log('Listening on port 8080'));