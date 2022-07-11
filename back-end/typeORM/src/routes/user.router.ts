import express from 'express';
import Router from 'express';
import multer from 'multer';
import path from 'path';
import userController from '../controllers/user.controller';;



const routerUser = express.Router();

routerUser.post('/user', userController.createUser);
routerUser.get('/user/:id', userController.getUser);
routerUser.get('/users', userController.getUsers);
routerUser.put('/', userController.updateUser);
routerUser.delete('/', userController.deleteUser);




export default routerUser;
