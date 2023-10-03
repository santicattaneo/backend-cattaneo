import { Router } from 'express';

const router = Router();
const users = [];

router.get('/', (req, res) => {
    res.send({ status: 'success', payload: users });
});
router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send({ status: 'success', payload: user });
});

export default router;