import { Router } from "express";
import { registerView, loginView, profileView, productsView, cartByIdView} from '../controllers/views.controller.js';
import { accessRolesEnum, passportStrategiesEnum} from '../config/enums.config.js';
import passport from 'passport';
import { checkUserRole } from '../middlewares/autentication/checkUserRole.js';

const router = Router();

router.get('/register', checkUserRole(accessRolesEnum.PUBLIC), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), registerView);
router.get('/login', checkUserRole(accessRolesEnum.PUBLIC), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), loginView);
router.get('/', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), profileView);
router.get('/products-view', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), productsView);
router.get('/carts-view/:cid', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), cartByIdView);

export default router;