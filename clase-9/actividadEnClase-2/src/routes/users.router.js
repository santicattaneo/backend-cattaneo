import { Router } from "express";

const router = Router();

const users = [];

router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send({ status: 'success', message: 'usuario registrado' })
});

router.get('/', (req, res) => {
    res.send({ status: 'success', payload: users });
});

export default router;