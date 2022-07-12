import Router from 'express';
import multer from 'multer';
import path from 'path';
import userController from '../controllers/user.controller.js';


const routerUser = new Router();

routerUser.post('/user', userController.createUser);
// routerUser.get('/user/:id', userController.getUser);
routerUser.get('/user/:id', userController.getUser);
routerUser.get('/users', userController.getUsers);
routerUser.put('/user', userController.updateUser);
routerUser.delete('/user', userController.createUser);
routerUser.delete('/user', userController.createUser);



export default routerUser;
