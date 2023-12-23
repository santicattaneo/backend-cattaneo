import { Router } from "express";
import { getCartById, postCart, postProductOnCart, purchase } from '../controllers/carts.controller.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js'

const router = Router();

router.get('/:cid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, getCartById);
router.post('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, postCart);
router.post('/:cid/product/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, postProductOnCart);
router.get('/:cid/purchase', [accessRolesEnum.USER], passportStrategiesEnum.JWT, purchase)

export default router;