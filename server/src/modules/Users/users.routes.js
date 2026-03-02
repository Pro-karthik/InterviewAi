import express from 'express';
import { registerController,loginController,getUserByIdController ,refreshController,logoutController} from './users.controllers.js';
import { authenticate,loginRateLimiter } from '../../middlewares/auth.middleware.js';
import { validationMiddleware } from '../../middlewares/validation.middleware.js';
import { registervalidator,LoginValidator } from './users.vaildator.js';

const router=express.Router();


router.post('/register',validationMiddleware(registervalidator),registerController);
router.post('/login',loginRateLimiter,validationMiddleware(LoginValidator),loginController );
router.get('/profile',authenticate,getUserByIdController);
router.post("/refresh", refreshController);
router.post("/logout",authenticate,logoutController);
export default router;