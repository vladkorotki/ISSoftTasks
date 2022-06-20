import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
const __dirname = path.resolve();
const PORT = 5501;
const app = express();

app.use(cors({
	// origin: 'http://127.0.0.1:5500',
	// origin: ['http://localhost:5500/', 'http://localhost:5500/user'],
	// credentials: true,
}));

app.use(express.static(path.resolve(__dirname, 'uploads')));
app.use(multer({ dest: "uploads" }).single("NAME"));

app.post("/", function (req, res, next) {

	let filedata = req.file;
	console.log(filedata);
	if (!filedata)
		console.log(("Ошибка при загрузке файла"));
	else
		res.send("Файл загружен");

});

app.use(function (request, response) {
	response.send("<h2>Hello</h2>");
	// console.log(app.use(express.static(__dirname)));
});
// app.get('/', (request, responce) => {
// 	console.log('good');

// 	responce.status(200).json('Server is working , Ese!!');
// });

// app.use(express.json());
// app.post('/', (request, responce) => {
// 	console.log(request.query.work);
// 	console.log(request.body);
// 	responce.status(200).json('Server is working , Ese!!');
// });

app.listen(PORT, () => console.log(`server started ${PORT}`));
