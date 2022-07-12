import express from 'express';
import path from 'path';
import cors from 'cors';
import routerAvatar from './routes/avatar.router.js';
import routerUser from './routes/user.router.js';

const __dirname = path.resolve();
const PORT = 5501;
const app = express();
app.use(cors({
	// origin: 'http://127.0.0.1:5500',
	// origin: ['http://localhost:5500/', 'http://localhost:5500/user'],
	// credentials: true,
}));

app.use(express.json());
app.use('/api', routerUser);
app.use('/', routerAvatar);


app.use(express.static(path.resolve(__dirname, 'uploads')));

app.use(function (request, response) {
	response.send("<h2>Hello</h2>");
});

app.listen(PORT, () => console.log(`server started ${PORT}`));
















// old code
// import express from 'express';
// import path from 'path';
// import cors from 'cors';
// import router from './router.js';
// import multer from 'multer';
// import crypto from 'crypto';

// const __dirname = path.resolve();
// const PORT = 5501;
// const app = express();

// app.use(express.json());
// app.use('/', router);

// app.use(cors({
// 	// origin: 'http://127.0.0.1:5500',
// 	// origin: ['http://localhost:5500/', 'http://localhost:5500/user'],
// 	// credentials: true,
// }));

// app.use(express.static(path.resolve(__dirname, 'uploads')));

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, 'uploads');
// 	},
// 	filename: function (req, file, cb) {
// 		const name = crypto.randomUUID();
// 		cb(null, name + path.extname(file.originalname));
// 	}
// });


// global middleware
// app.use(multer({ storage: storage }).single("NAME"));

// const upload = multer({ storage: storage });

// app.post("/", multer({ storage: storage }).single("NAME"), function (req, res, next) {

// 	const filedata = req.file;
// 	console.log(filedata);
// 	if (!filedata) {
// 		console.log(("Ошибка при загрузке файла"));
// 	}

// 	else {
// 		// res.status(200).json('good');
// 		console.log("Файл загружен");
// 		next();
// 	}

// });

// app.use(function (request, response) {
// 	response.send("<h2>Hello</h2>");
// });


// app.listen(PORT, () => console.log(`server started ${PORT}`));