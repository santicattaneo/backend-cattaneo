import { Router } from 'express';
import usersModel from '../dao/dbManagers/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
    res.status(201).send({ status: 'success', message: 'user regitered' });
});
router.get('/fail-register', async (req, res) => {
    res.status(500).send({ status: 'error', message: 'register fail' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
    try {
        if(!req.user){
            return res.status(401).send({ status: 'error', message: 'invalid credentials' });
        };
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age
        };
        res.send({ status: 'success', message: 'login success' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
});
router.get('/fail-login', async (req, res) => {
    res.status(500).send({ status: 'error', message: 'login fail' });
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    res.send({ status: 'success', message: 'user registered' });
});
router.get('/githubcb', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).send({ status: 'error', message: error.message});
        res.redirect('/');
    });
});

export default router;