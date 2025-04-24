import express from 'express';
import { createUser, userLogin } from '../controller/userController.js';

const userRoute = express.Router();

userRoute.post('/',createUser);
userRoute.get('/',userLogin)

export default userRoute;