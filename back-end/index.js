import express from 'express';
import cors from 'cors';
const PORT = 5501;
const app = express();

app.use(cors({
	// origin: 'http://127.0.0.1:5500',
	origin: 'http://localhost:5500',
	credentials: true,
}));


app.get('/', (request, responce) => {
	console.log('good');

	responce.status(200).json('Server is working , Ese!!');
});

app.use(express.json());
app.post('/', (request, responce) => {
	console.log(request.query.work);
	console.log(request.body);
	responce.status(200).json('Server is working , Ese!!');
});

app.listen(PORT, () => console.log(`server started ${PORT}`));
