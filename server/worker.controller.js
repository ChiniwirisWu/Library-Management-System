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
				if(rows[0].validado){
					if(isMatch){
						const token = signToken(rows[0].nombre);
						res.status(200).send(token);
					} else{
						res.status(400).send('Contraseña incorrecta.')
					}
				} else {
					res.status(401).send('Trabajador no está validado.')
				}
			} else {
				res.status(400).send('Usuario no existe.')
			}
		} catch (e){
			res.status(500).send(e.message);
		}
	},
	getAllWorkers: async (req, res)=>{
		if(req.worker.rol != 'admin') return res.status(401).send('Esta acción solo puede ser realizada por un administrador.');
		try {
			const [rows, columns] = await pool.execute('SELECT * FROM trabajador');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getWorkerBynombre: async (req, res)=>{
		if(req.worker.rol != 'admin') return res.status(401).send('Esta acción solo puede ser realizada por un administrador.');
		try{
			const workers = await getWorkerBynombre_handler(req, res);
			if(workers.length > 0){
				res.status(200).send(workers[0]);
			} else {
				res.status(400).send('No se encontró el trabajador.');
			}
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	validateWorker: async (req, res)=>{
		if(req.worker.rol != 'admin') return res.status(401).send('Esta acción solo puede ser realizada por un administrador.');
		try{
			const workers = await getWorkerBynombre_handler(req, res);
			if(workers.length > 0){
				const [rows, colums] = await pool.execute('UPDATE trabajador SET validado=1 WHERE nombre = ?', [req.params.nombre]);
				if(rows.affectedRows > 0){
					res.status(200).send(`Se valido la cuenta del usuario "${req.params.nombre}".`);
				} else{
					res.status(400).send('Hubo un error validando la cuenta el trabajador.');
				}
			} else {
				res.status(400).send('No se encontró el trabajador.');
			}
		} catch(e){
			res.status(500).send(e.message);
		}
		
	},
	updateWorkerBynombre: async (req, res)=>{
		if(req.worker.rol != 'admin') return res.status(401).send('Esta acción solo puede ser realizada por un administrador.');
		try {
			const { nombre } = req.params;
			const { body } = req;
			const workers = await getWorkerBynombre_handler(req, res);
			if (workers.length > 0){
				const salt = await bcrypt.genSalt();
				const hash = await bcrypt.hash(body.contrasena, salt);
				const [rows, columns] = await pool.execute('UPDATE trabajador SET nombre = ?, rol = ?, contrasena = ?, salt = ?, validado = ? WHERE nombre = ?', [body.nombre, body.rol, hash, salt, body.validado, nombre]);
				if(rows.affectedRows > 0){
					res.status(200).send('Trabajador actualizado con éxito.');
				} else{
					res.status(400).send('Hubo un error actualizando el Trabajador.');
				}
			} else {
				res.status(400).send('El trabajador ingresado no existe.')
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}, 
	deleteWorkerBynombre: async (req, res)=>{
		if(req.worker.rol != 'admin') return res.status(401).send('Esta acción solo puede ser realizada por un administrador.');
		try {
			const { nombre } = req.params;
			const workers = await getWorkerBynombre_handler(req, res);
			if(workers.length > 0){
				const [rows, columns] = await pool.execute('DELETE FROM trabajador WHERE nombre = ?', [nombre]);
				if(rows.affectedRows > 0) {
					res.status(200).send('Eliminado el trabajador con exito.');
				} else {
					res.status(400).send('Ocurrió un error Eliminado el trabajador.');
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
