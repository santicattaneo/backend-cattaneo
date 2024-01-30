import { Router } from "express";
import { getProducts, getProductById, postProduct, updateProductById, deleteProductById, getMockProducts } from '../controllers/product.controller.js';
import { accessRolesEnum, passportStrategiesEnum} from '../config/enums.config.js';
const router = Router();

router.get('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, getProducts);
router.get('/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, getProductById);
router.post('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, postProduct);
router.put('/:pid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, updateProductById);
router.delete('/:pid', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM], passportStrategiesEnum.JWT, deleteProductById);
router.get('/mockingproducts', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, getMockProducts)

export default router;