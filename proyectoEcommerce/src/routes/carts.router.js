import { Router } from "express";
import { getCartById, postCart, postProductOnCart, purchase } from '../controllers/carts.controller.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js'
import { checkUserRole } from "../middlewares/autentication/checkUserRole.js";
import passport from 'passport'

const router = Router();

router.get('/:cid', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: true }), getCartById);
router.post('/', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), postCart);
router.post('/:cid/product/:pid', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), postProductOnCart);
router.get('/:cid/purchase', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), purchase)

export default router;