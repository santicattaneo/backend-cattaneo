import { Router } from 'express';
import { register, login, github, githubCb, logout, current, recoverPasswordGet, recoverPasswordPost, userToAdmin } from '../controllers/users.controller.js';
import { roleAuth } from '../middlewares/auth/role.middleware.js'; 
import { accessRolesEnum } from '../config/enums.config.js';

const router = Router();

router.post('/register', roleAuth(accessRolesEnum.PUBLIC), register);
router.post('/login', roleAuth(accessRolesEnum.PUBLIC), login);
router.get('/github', roleAuth(accessRolesEnum.PUBLIC), github);
router.get('/githubcb', roleAuth(accessRolesEnum.PUBLIC), githubCb);
router.get('/logout', roleAuth(accessRolesEnum.USER, accessRolesEnum.ADMIN), logout);
router.get('/current', roleAuth(accessRolesEnum.USER, accessRolesEnum.ADMIN), current);
router.get('/recover-password', roleAuth(accessRolesEnum.USER, accessRolesEnum.ADMIN), recoverPasswordGet);
router.post('/recover-password', roleAuth(accessRolesEnum.USER, accessRolesEnum.ADMIN), recoverPasswordPost);
router.get('/admin/:uid', roleAuth(accessRolesEnum.USER), userToAdmin);

export default router;