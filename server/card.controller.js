import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const roles = ['admin', 'worker']

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

async function getCardByISBN_handler(req, res){
	const { isbn } = req.params;
	const [rows, columns] = await pool.execute('SELECT * FROM ficha WHERE isbn = ?', [isbn]);
	return rows;
}

const Card = {
	getAllCards: async (req, res)=>{
		if(!roles.includes(req.worker.rol)) return res.status(401).send('No tienes permiso para realizar ésta acción');
		try {
			const [rows, columns] = await pool.execute('SELECT * FROM ficha');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getCardByISBN: async (req, res)=>{
		if(!roles.includes(req.worker.rol)) return res.status(401).send('No tienes permiso para realizar ésta acción');
		try{
			const card = await getCardByISBN_handler(req, res);
			if(card.length > 0){
				res.status(200).send(card[0]);
			} else {
				res.status(400).send('No se encontró la ficha.');
			}
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	createCard: async (req, res)=>{
		if(!roles.includes(req.worker.rol)) return res.status(401).send('No tienes permiso para realizar ésta acción');
		try {
			const { body } = req;
			console.log(body)
			const [rows, columns] = await pool.execute('INSERT INTO ficha (isbn, autor, titulo, edicion, ciudad, editorial, ano, coleccion, ca, volumen, ejemplar, esReferencia, dewey, cutter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [body.isbn, body.autor, body.titulo, body.edicion, body.ciudad, body.editorial, body.ano, body.coleccion, body.ca, body.volumen, body.ejemplar, body.esReferencia, body.dewey, body.cutter]);
			if(rows.affectedRows > 0){
				res.status(200).send('Ficha creada con éxito.');
			} else{
				res.status(400).send('Hubo un error creando la ficha.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	},
	updateCardByISBN: async (req, res)=>{
		if(!roles.includes(req.worker.rol)) return res.status(401).send('No tienes permiso para realizar ésta acción');
		try {
			const { isbn } = req.params;
			const { body } = req;
			const [rows, columns] = await pool.execute('UPDATE ficha SET isbn = ?, autor = ?, titulo = ?, edicion = ?, ciudad = ?, editorial = ?, ano = ?, coleccion = ?, ca = ?, volumen = ?, ejemplar = ?, esReferencia = ?, dewey = ?, cutter = ? WHERE isbn = ?', [body.isbn, body.autor, body.titulo, body.edicion, body.ciudad, body.editorial, body.ano, body.coleccion, body.ca, body.volumen, body.ejemplar, body.esReferencia, body.dewey, body.cutter, isbn]);
			if(rows.affectedRows > 0){
				res.status(200).send('Ficha actualizada con éxito.');
			} else{
				res.status(400).send('Hubo un error creando la ficha.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}, 
	deleteCardByISBN: async (req, res)=>{
		if(!roles.includes(req.worker.rol)) return res.status(401).send('No tienes permiso para realizar ésta acción');
		try {
			const { isbn } = req.params;
			const response = await getCardByISBN_handler(req, res);
			if(response.length > 0){
				const [rows, columns] = await pool.execute('DELETE FROM ficha WHERE isbn = ?', [isbn]);
				if(rows.affectedRows > 0) {
					res.status(200).send('Eliminado con éxito.');
				} else {
					res.status(400).send('Ocurrió un error Eliminado el registro.');
				}
			} else {
				res.status(400).send('No se encontró la ficha.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}
}

export default Card;
