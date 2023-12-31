import { Router } from "express";
import { getProducts, getProductById, postProduct, updateProductById, deleteProductById } from '../controllers/product.controller.js';

const router = Router();

router.get('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, getProducts);
router.get('/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, getProductById);
router.post('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, postProduct);
router.put('/:pid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, updateProductById);
router.delete('/:pid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, deleteProductById);

export default router;