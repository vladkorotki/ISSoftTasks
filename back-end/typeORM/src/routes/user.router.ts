import express from 'express';
import Router from 'express';
import multer from 'multer';
import path from 'path';
import userController from '../controllers/user.controller';
import { checkJwt } from "../middlewares/auth.middleware"



const routerUser = express.Router();

routerUser.post('/user', userController.createUser);
routerUser.post('/', userController.login);
routerUser.get('/user', checkJwt, userController.getUser);
routerUser.get('/users', checkJwt, userController.getUsers);
routerUser.put('/', checkJwt, userController.updateUser);
routerUser.delete('/', checkJwt, userController.deleteUser);




export default routerUser;
