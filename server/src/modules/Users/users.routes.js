import express from 'express';
import { registerusercontroller,loginusercontroller,getUserByIdcontroller } from './users.controllers.js';
import { authenticate,loginRatelimiter } from '../../middlewares/auth.middleware.js';
import { validationMiddleware } from '../../middlewares/validation.middleware.js';
import { registervalidator,LoginValidator } from './users.vaildator.js';
import { refreshTokenController } from '../Refreshtoken/refreshtoken.endpoint.js';

const router=express.Router();


router.post('/register',validationMiddleware(registervalidator),registerusercontroller);
router.post('/login',loginRatelimiter,validationMiddleware(LoginValidator),loginusercontroller );
router.get('/profile',authenticate,getUserByIdcontroller);
router.post("/refresh", refreshTokenController);
export default router;