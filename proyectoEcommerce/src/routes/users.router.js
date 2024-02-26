import { Router } from "express";
import { register, failRegister, login, failLogin, github, githubCb, logout, current, resetPassword, userToAdmin, documents } from '../controllers/users.controller.js';
import { checkUserRole } from '../middlewares/autentication/checkUserRole.js';
import passport from 'passport';
import { accessRolesEnum, passportStrategiesEnum} from '../config/enums.config.js';

const router = Router();

router.post('/register', checkUserRole(accessRolesEnum.PUBLIC), passport.authenticate('register', { failureRedirect: 'fail-register' }), register);
router.get('/fail-register', checkUserRole(accessRolesEnum.PUBLIC), failRegister);
router.post('/login', checkUserRole(accessRolesEnum.PUBLIC), passport.authenticate('login', { failureRedirect: 'fail-login' }), login);
router.get('/fail-login', checkUserRole(accessRolesEnum.PUBLIC), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), failLogin);
router.get('/github', checkUserRole(accessRolesEnum.PUBLIC), passport.authenticate('github', { scope: ['user:email'] }), github);
router.get('/githubcb', checkUserRole(accessRolesEnum.PUBLIC), passport.authenticate('github', { failureRedirect: '/login' }), githubCb);
router.get('/logout', checkUserRole(accessRolesEnum.USER, accessRolesEnum.ADMIN), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), logout);
router.get('/current', checkUserRole(accessRolesEnum.USER, accessRolesEnum.ADMIN), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), current);
router.get('/recover-password', checkUserRole(accessRolesEnum.USER, accessRolesEnum.ADMIN), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), resetPassword);
router.get('/premium/:uid', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT, { session: false }), userToAdmin);
router.post('/:uid/documents', checkUserRole(accessRolesEnum.USER), passport.authenticate(passportStrategiesEnum.JWT), documents);
export default router;