import { Router } from 'express';
import { getUser, createUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/', getUser);
router.post('/', createUser);

export default router;