import { Router } from 'express';
import Contacts from '../dao/factory.js';
import ContactsDto from '../DTOs/contacts.dto.js';
import ContactsRepository from '../repositories/contacts.repository.js';

const router = Router();
const contacsDao = new Contacts();
const contactsRepository = new ContactsRepository(contacsDao);

router.get('/', async (req, res) => {
    const data = await contactsRepository.getContacts();
    res.json(data);
});

router.post('/', async (req, res) => {
    const { name, phone, lastname } = req.body;
    const data = await contactsRepository.createContact({ name, lastname, phone });
    res.json(data);
});

export default router;