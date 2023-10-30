import { Router } from 'express';
import { usersModel } from '../models/users.model.js';

const router = Router();

//read
router.get('/', async (req, res) => {
    try {
        const users = await usersModel.find();
        res.send({ status: 'success', payload: users });
    } catch (error) {
        console.log('error:',error.message);
        res.status(500).send({ status: 'error', error: error.message});
    };
});

//create
router.post('/', async (req, res) => {
    const { first_name, last_name, email } = req.body;

    if(!first_name || !last_name || !email) {
        return res.status(400).send({ status: 'error', message: 'Incomplete values' });
    };
    
    try {
        const result = await usersModel.create({
            first_name,
            last_name,
            email
        });
        res.send({ status: 'success', payload: result });    
    } catch (error) {
        console.log('error:',error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }
});

//update
router.put('/:uid', async (req, res) => {
    const { uid } = req.params;
    
    const userToUpdate = req.body;
    if(!userToUpdate.first_name || !userToUpdate.last_name || !userToUpdate.email) {
        return res.status(400).send({ status: 'error', message: 'Incomplete values' });
    };

    try {
        const result = await usersModel.updateOne({ _id: uid }, userToUpdate);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log('error:', error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }
});

//delete
router.delete('/:uid', async (req, res) => {
    const { uid } = req.params

    try {
        const result = await usersModel.deleteOne({ _id: uid });
        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log('error:', error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }
})

export default router;