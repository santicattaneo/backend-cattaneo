import express from 'express';
import session from 'express-session';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ exttended: true }));

app.use(session({
    secret: 'Coder5575secret',
    resave: true, //mantiene la session activa mientras se haga algo
    saveUninitialized: false, //desactivar la cookie si no se logueo el usuario
    // cookie: {
    //     maxAge: 30000
    // }
}));

function auth(req, res, next) {
    if(req.session?.user === 'pepe' && req.session?.admin) {
        return next();
    };
    return res.status(401).send('Permissions validate error');
};

app.get('/session', (req, res) => {
    if(req.session.counter) {
        req.session.counter++;
        res.send(`You have visited our site ${req.session.counter} times`);
    } else {
        req.session.counter = 1;
        res.send('Welcome to our site');
    }
});

app.get('/login', (req, res) => {
    const { username, password } = req.query;
    if(username !== 'pepe' || password !== 'pepepass') {
        return res.status(401).send('Failed login');
    }
    req.session.user = username;
    req.session.admin = true;
    res.send('Successfull login');
});

app.get('/private', auth, (req, res) => {
    res.send('You have permissions to access this servicie');
})

app.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(!error) res.send('Succesfull logout')
        else res.send({ status: 'error', message: error.message });
    });
});

app.listen(8080, () => console.log('Listening on port 8080'));