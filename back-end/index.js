import express from 'express';
const PORT = 3000;
const app = express();

app.get('/', (request, responce) => {
	console.log(request.query.work);

	responce.status(200).json('Server is working , Ese!!');
});

app.use(express.json());
app.post('/', (request, responce) => {
	// console.log(request.query.work);
	console.log(request.body);
	responce.status(200).json('Server is working , Ese!!');
});

app.listen(PORT, () => console.log(`server started ${PORT}`));
