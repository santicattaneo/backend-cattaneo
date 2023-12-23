import { Router } from "express";
import { registerView, loginView, profileView, productsView, cartByIdView} from '../controllers/views.controller.js';

const router = Router();

router.get('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, registerView);
router.get('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, loginView);
router.get('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, profileView);
router.get('/products-view', [accessRolesEnum.USER], passportStrategiesEnum.JWT, productsView);
router.get('/carts-view/:cid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, cartByIdView);

export default router;