import { Router } from "express";
import { getProducts, getProductById, postProduct, updateProductById, deleteProductById, getMockProducts } from '../controllers/product.controller.js';
import { accessRolesEnum, passportStrategiesEnum} from '../config/enums.config.js';
import { checkUserRole } from '../middlewares/autentication/checkUserRole.js';
import passport from 'passport';

const router = Router();

router.get('/', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), getProducts);
router.get('/:pid', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), getProductById);
router.post('/', checkUserRole(accessRolesEnum.ADMIN), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), postProduct);
router.put('/:pid', checkUserRole(accessRolesEnum.ADMIN), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), updateProductById);
router.delete('/:pid', checkUserRole(accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), deleteProductById);
router.get('/mockingproducts', checkUserRole(accessRolesEnum.ADMIN), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), getMockProducts);

export default router;