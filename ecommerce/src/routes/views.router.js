import { Router } from 'express';
import { registerView, loginView, profileView, productsView, cartByIdView, resetPasswordView } from '../controllers/views.controller.js';
import { roleAuth } from '../middlewares/auth/role.middleware.js'; 
import { accessRolesEnum } from '../config/enums.config.js';

const router = Router();

router.get('/register', roleAuth(accessRolesEnum.PUBLIC), registerView);
router.get('/login', roleAuth(accessRolesEnum.PUBLIC), loginView);
router.get('/', roleAuth(accessRolesEnum.USER),profileView);
router.get('/products-view', roleAuth(accessRolesEnum.USER),productsView);
router.get('/carts-view/:cid', roleAuth(accessRolesEnum.USER),cartByIdView);
router.get('/reset-password', roleAuth(accessRolesEnum.USER),resetPasswordView);

export default router;