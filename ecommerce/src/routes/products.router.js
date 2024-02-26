import { Router } from 'express';
import { getProducts, getProductById, postProduct, updateProductById, deleteProductById, getMockProducts } from '../controllers/products.controller.js';
import { roleAuth } from '../middlewares/auth/role.middleware.js'; 
import { accessRolesEnum } from '../config/enums.config.js';

const router = Router();

router.get('/', roleAuth(accessRolesEnum.USER), getProducts);
router.get('/:pid', roleAuth(accessRolesEnum.USER), getProductById);
router.post('/', roleAuth(accessRolesEnum.ADMIN), postProduct);
router.put('/:pid', roleAuth(accessRolesEnum.ADMIN), updateProductById);
router.delete('/:pid', roleAuth(accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM), deleteProductById);
router.get('/mockingproducts', roleAuth(accessRolesEnum.ADMIN), getMockProducts);

export default router;