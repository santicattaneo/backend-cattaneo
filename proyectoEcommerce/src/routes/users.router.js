import { Router } from "express";
import { register, failRegister, login, failLogin, github, githubCb, logout, current } from '../controllers/users.controller.js';

const router = Router();

router.post('/register', [accessRolesEnum.PUBLIC], passport.authenticate('register', { failureRedirect: 'fail-register' }), register);
router.get('/fail-register', [accessRolesEnum.PUBLIC], failRegister);
router.post('/login', [accessRolesEnum.PUBLIC], passport.authenticate('login', { failureRedirect: 'fail-login' }), login);
router.get('/fail-login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, failLogin);
router.get('/github', [accessRolesEnum.PUBLIC], passport.authenticate('github', { scope: ['user:email'] }), github);
router.get('/githubcb', [accessRolesEnum.PUBLIC], passport.authenticate('github', { failureRedirect: '/login' }), githubCb);
router.get('/logout', [accessRolesEnum.USER, accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, logout);
router.get('/current', [accessRolesEnum.USER, accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, current);

export default router;