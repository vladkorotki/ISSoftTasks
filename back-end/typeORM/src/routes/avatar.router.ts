import express from 'express';
import Router from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import FileController from '../controllers/avatar.contorller';

const routerAvatar = express.Router();
const arr = (async function () {
	return await FileController.uploadAvatar();
})();






// console.log(async () => {
// 	return await FileController.uploadAvatar()
// });

routerAvatar.post('/', FileController.storage(), FileController.middleware);

routerAvatar.get('/');
routerAvatar.get('/');
routerAvatar.put('/');
routerAvatar.delete('/');

export default routerAvatar;
