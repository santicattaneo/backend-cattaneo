import { Router } from 'express';
import { getCartById, postCart, postProductOnCart, purchase } from '../controllers/carts.controller.js';
import { roleAuth } from '../middlewares/auth/role.middleware.js'; 
import { accessRolesEnum } from '../config/enums.config.js';

const router = Router();

router.get('/:cid', roleAuth(accessRolesEnum.USER), getCartById);
router.post('/', roleAuth(accessRolesEnum.USER), postCart);
router.post('/:cid/product/:pid', roleAuth(accessRolesEnum.USER), postProductOnCart);
router.get('/:cid/purchase', roleAuth(accessRolesEnum.USER), purchase);

export default router;