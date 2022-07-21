// import Router from 'express';
// import multer from 'multer';
// import path from 'path';
// import crypto from 'crypto';

// class FileController {


// 	storage() {
// 		const storage = multer.diskStorage({
// 			destination: function (req, file, cb) {
// 				cb(null, 'uploads');
// 			},
// 			filename: function (req, file, cb) {
// 				const name = crypto.randomUUID();
// 				cb(null, name + path.extname(file.originalname));
// 			}
// 		});
// 		return multer({ storage: storage }).single("NAME");
// 	}

// 	async middleware(req, res, next) {
// 		const filedata = req.file;
// 		console.log(filedata);
// 		if (!filedata) {
// 			console.log(("Ошибка при загрузке файла"));
// 		}
// 		else {
// 			// res.status(200).json('good');
// 			console.log("Файл загружен");
// 			next();
// 		}
// 	}




// }

// export default new FileController();