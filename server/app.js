import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import Worker from './worker.js';
dotenv.config();

//middlewares 
const app = express();
app.use(express.json());
app.use(cors()); 

//funciones
const signJwt = name => jwt.sign(name, process.env.SECRET)
const validateJwt = expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
const assignWorker = async (req, res, next)=>{
	try{
		const worker = await Worker.getWorker(req.auth);
		req.worker = worker;
		next();
	} catch(e){
		next(e);
	}
}
const isAuthorized = express.Router().use(validateJwt, assignWorker)

app.post('/register', Worker.register);
app.post('/login', Worker.login);

//endpoints para las fichas.
//app.get('/cards', isAuthorized, Card.getAllCards);
//app.get('/card/:id', isAuthorized, Card.getCardById);
//app.post('/card', isAuthorized, Card.createCard);
//app.put('/card/:id', isAuthorized, Card.updateCardById);
//app.delete('/card/:id', isAuthorized, Card.deleteCardById);

//endpoints para los clientes.
//app.get('/clients', isAuthorized, Client.getAllClients);
//app.get('/client/:id', isAuthorized, Client.getClientById);
//app.post('/client', isAuthorized, Client.register);
//app.put('/client/:id', isAuthorized, Client.updateClientById);
//app.delete('/client/:id', isAuthorized, Client.deleteClientById);

//endpoints para los prestamos
//app.get('/borrowed', isAuthorized, Borrowed.getAllBorrowed);
//app.get('/borrowed/:id', isAuthorized, Borrowed.getBorrowedById);
//app.post('/borrowed', isAuthorized, Borrowed.createBorrowed);
//app.put('/borrowed/:id', isAuthorized, Borrowed.updateBorrowedById);
//app.delete('/borrowed/:id', isAuthorized, Borrowed.deleteBorrowedById);

app.listen(9090, ()=>{
	console.log('server running on port 9090');
})
