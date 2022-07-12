import Router from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import FileController from '../controllers/avatar.contorller.js';
const routerAvatar = new Router();

// routerAvatar.post('/', await FileController.uploadAvatar());
const arr = await FileController.uploadAvatar()


routerAvatar.post('/', arr);

routerAvatar.get('/');
routerAvatar.get('/');
routerAvatar.put('/');
routerAvatar.delete('/');

export default routerAvatar;
