import { Router } from 'express';
import { uploader } from '../utils.js';

const router = Router();
const pets = [];

//middleware router
router.use((req, res, next) => {
    console.log('Time Router:', Date.now());
    next();
})

router.get('/', (req, res) => {
    res.send({ status: 'success', payload: pets });
});
router.post('/', (req, res) => {
    const pet = req.body;
    pets.push(pet);
    res.send({ status: 'success', payload: pet });
});

//middleware de terceros
router.post('/v2', uploader.single('thumbnail'), (req, res) => {
    const filename = req.file.filename;
    if(!filename) {
        return res.status(500).send({ status: 'error', error: 'no se puede subir el archivo' });
    };
    const pet = req.body;
    pet.thumbnail = `http://localhost:8080/img/pets/${filename}`
    pets.push(pet);
    res.send({ status: 'success', payload: pet });
});

export default router;