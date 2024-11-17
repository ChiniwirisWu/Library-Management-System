import mysql2 from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});
const signToken = nombre => jwt.sign(nombre, process.env.SECRET);

async function getWorkerBynombre_handler(req, res){
	const { nombre } = req.params;
	const [rows, columns] = await pool.execute('SELECT * FROM trabajador WHERE nombre = ?', [nombre]);
	return rows;
}

const Worker = {
	//Funciones para endpoints...
	register: async (req, res)=>{
		try{
			const { body } = req;
			const [rows, columns] = await pool.execute('SELECT * FROM trabajador WHERE nombre = ?', [body.nombre]);
			if (rows.length < 1){
				const salt = await bcrypt.genSalt();
				const hashed = await bcrypt.hash(body.contrasena, salt);
				const response = await pool.execute('INSERT INTO trabajador (nombre, rol, contrasena, salt, validado) VALUES (?, ?, ?, ?, ?)', [body.nombre, 'worker', hashed, salt, 0]);
				if (response[0].affectedRows == 1) {
					const [rows, columns] = await pool.execute('SELECT * FROM trabajador WHERE nombre = ?', [body.nombre]);
					res.status(200).send('Se ha enviado su solicitud de registro exitosamente.');
				} else {
					res.status(400).send('Ha ocurrido un error con los datos ingresados.');
				}
			} else{
				res.status(400).send('Usuario ya existe.')
			}
		} catch (e){
			res.status(500).send(e.message)
		}
	},
	login: async (req, res)=>{
		try {
			const { body } = req;
			const [rows, columns] = await pool.execute('SELECT * FROM trabajador WHERE nombre = ?', [body.nombre]);
			if(rows.length > 0){
				const isMatch = await bcrypt.compare(body.contrasena, rows[0].contrasena);	
				if(isMatch){
					const token = signToken(rows[0].nombre);
					res.status(200).send(token);
				} else{
					res.status(400).send('Contraseña incorrecta.')
				}
			} else {
				res.status(400).send('Usuario no existe.')
			}
		} catch (e){
			res.status(500).send(e.message);
		}
	},
	getAllWorkers: async (req, res)=>{
		try {
			const [rows, columns] = await pool.execute('SELECT * FROM trabajador');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getWorkerBynombre: async (req, res)=>{
		try{
			const clients = await getWorkerBynombre_handler(req, res);
			if(clients.length > 0){
				res.status(200).send(clients[0]);
			} else {
				res.status(400).send('No se encontró el cliente.');
			}
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	updateWorkerBynombre: async (req, res)=>{
		try {
			const { nombre } = req.params;
			const { body } = req;
			const clients = await getWorkerBynombre_handler(req, res);
			if (clients.length > 0){
				const salt = await bcrypt.genSalt();
				const hash = await bcrypt.hash(body.contrasena, salt);
				const [rows, columns] = await pool.execute('UPDATE trabajador SET nombre = ?, rol = ?, contrasena = ?, salt = ?, validado = ? WHERE nombre = ?', [body.nombre, body.rol, hash, salt, nombre, body.validated]);
				if(rows.affectedRows > 0){
					res.status(200).send('Cliente actualizado con éxito.');
				} else{
					res.status(400).send('Hubo un error actualizando el cliente.');
				}
			} else {
				res.status(400).send('El cliente ingresado no existe.')
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}, 
	deleteWorkerBynombre: async (req, res)=>{
		try {
			const { nombre } = req.params;
			const clients = await getWorkerBynombre_handler(req, res);
			if(clients.length > 0){
				const [rows, columns] = await pool.execute('DELETE FROM trabajador WHERE nombre = ?', [nombre]);
				if(rows.affectedRows > 0) {
					res.status(200).send('Eliminado con exito.');
				} else {
					res.status(400).send('Ocurrió un error Eliminado el cliente.');
				}
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	},
	//Funciones normales.... 
	getWorker: async (nombre)=>{
		const [rows, columns] = await pool.execute('SELECT * FROM trabajador WHERE nombre = ?', [nombre]);
		if(rows.length > 0){
			return rows[0];
		} else {
			return [];
		}
	},
} 

export default Worker;
