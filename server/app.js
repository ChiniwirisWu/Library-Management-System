import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import Worker from './worker.controller.js';
import Card from './card.controller.js';
import Loan from './loan.controller.js';
dotenv.config();

//middlewares 
const app = express();
app.use(express.json());
app.use(cors()); 

//funciones
const signJwt = name => jwt.sign(name, process.env.SECRET)
const validateJwt = expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
const assignWorker = async (req, res, next) => {
	try {
		const worker = await Worker.getWorker(req.auth);
		req.worker = worker;
		next();
	} catch (e) {
		next(e);
	}
}
const isAuthorized = express.Router().use(validateJwt, assignWorker)


//endpoints para las fichas.
app.get('/cards', Card.getAllCards);
app.get('/card/:isbn', Card.getCardByISBN);
app.post('/card', isAuthorized, Card.createCard);
app.put('/card/:isbn', isAuthorized, Card.updateCardByISBN);
app.delete('/card/:isbn', isAuthorized, Card.deleteCardByISBN);

//endpoints para los clientes.
app.post('/register', Worker.register);
app.post('/login', Worker.login);
app.get('/workers', isAuthorized, Worker.getAllWorkers);
app.get('/worker/:nombre', isAuthorized, Worker.getWorkerBynombre);
app.put('/worker/:nombre', isAuthorized, Worker.updateWorkerBynombre);
app.put('/worker/validateWorker/:nombre', isAuthorized, Worker.validateWorker);
app.delete('/worker/:nombre', isAuthorized, Worker.deleteWorkerBynombre);

//endpoints para los prestamos
app.get('/loans', isAuthorized, Loan.getAllLoans);
app.get('/loan/:isbn/:cedula', isAuthorized, Loan.getLoan);
app.post('/loan', isAuthorized, Loan.createLoan);
app.put('/loan/:isbn/:cedula', isAuthorized, Loan.updateLoan);
app.put('/loan/validateLoan/:isbn/:cedula', isAuthorized, Loan.validateLoan);
app.delete('/loan/:isbn/:cedula', isAuthorized, Loan.deleteLoan);

app.listen(9090, ()=>{
	console.log('server running on port 9090');
})

