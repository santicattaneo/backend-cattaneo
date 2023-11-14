import { Router } from 'express';
import usersModel from '../models/users.model.js';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, age, email, password } = req.body;
        if(!first_name || !last_name || !age || !email || !password){
            return res.status(422).send({ status: 'error', message: 'incomplete values' });
        };
        const exist = await usersModel.findOne({ email });
        if(exist) {
            return res.status(400).send({ status: 'error', message: 'user already exists' });
        }
        await usersModel.create({
            first_name,
            last_name,
            age,
            email,
            password
        });
        res.status(201).send({ status: 'success', message: 'user registered' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email, password });
        if(!user){
            res.status(400).send({ status: 'error', message: 'incorrect credentials' });
        };
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        };
        res.send({ status: 'success', message: 'login success' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).send({ status: 'error', message: error.message});
        res.redirect('/');
    });
});

export default router;