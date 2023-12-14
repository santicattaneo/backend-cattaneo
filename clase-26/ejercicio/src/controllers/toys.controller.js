import { getToys as getToysService, saveToy as saveToyService } from '../services/toys.service.js';

const getToys = async (req, res) => {
    try {
        // Validaciones
        //
        const toys = await getToysService();
        res.send({ status: 'success', payload: toys });
    } catch (error) {
        res.status(500).send({ statuss: 'error', message: error.message });
    };
};

const saveToy = async (req, res) => {
    try {
        // Validaciones
        //
        const toy = req.body;
        await saveToyService(toy);
        res.status(201).send({ status: 'success', message: 'Juguete añadido' });
    } catch (error) {
        res.status(500).send({ statuss: 'error', message: error.message });
    };
};

export {
    getToys,
    saveToy
};