import Router from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import FileController from './fileController.js';
const router = new Router();

router.post('/', await FileController.uploadAvatar());

router.get('/');
router.get('/');
router.put('/');
router.delete('/');

export default router;
