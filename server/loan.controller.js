import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

async function getLoanById_handler(req, res){
	const { id } = req.params;
	const [rows, columns] = await pool.execute('SELECT * FROM prestamo WHERE id = ?', [id]);
	return rows;
}

const Loan = {
	getAllLoans: async (req, res)=>{
		try {
			const [rows, columns] = await pool.execute('SELECT * FROM prestamo');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getLoanById: async (req, res)=>{
		try{
			const Loan = await getLoanById_handler(req, res);
			if(Loan.length > 0){
				res.status(200).send(Loan[0]);
			} else {
				res.status(400).send('No se encontró el préstamo.');
			}
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	createLoan: async (req, res)=>{
		try {
			const { body } = req;
			console.log('hi')
			console.log(body)
			const [rows, columns] = await pool.execute('INSERT INTO prestamo (fk_isbn, fk_trabajador, fecha_inicio, fecha_final, dias, cedula, nombre, apellido, direccion, telefono, telefonoVecino) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [body.isbn, body.trabajador, body.fecha_inicio, body.fecha_final, body.dias, body.cedula, body.nombre, body.apellido, body.direccion, body.telefono, body.telefonoVecino]);
			if(rows.affectedRows > 0){
				res.status(200).send('Préstamo creado con éxito.');
			} else{
				res.status(400).send('Hubo un error creando el préstamo.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	},
	updateLoanById: async (req, res)=>{
		try {
			const { id } = req.params;
			const { body } = req;
			const [rows, columns] = await pool.execute('UPDATE prestamo SET fk_isbn = ?, fk_trabajador = ?, fecha_inicio = ?, fecha_final = ?, dias = ?, cedula = ?, nombre = ?, apellido = ?, direccion = ?, telefono = ?, telefonoVecino = ? WHERE id = ?', [body.isbn, body.trabajador, body.fecha_inicio, body.fecha_final, body.dias, body.cedula, body.nombre, body.apellido, body.direccion, body.telefono, body.telefonoVecino, id]);
			if(rows.affectedRows > 0){
				res.status(200).send('Préstamo actualizado con éxito.');
			} else{
				res.status(400).send('Hubo un error creando el préstamo.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}, 
	deleteLoanById: async (req, res)=>{
		try {
			const { id } = req.params;
			const response = await getLoanById_handler(req, res);
			if(response.length > 0){
				const [rows, columns] = await pool.execute('DELETE FROM prestamo WHERE id = ?', [id]);
				if(rows.affectedRows > 0) {
					res.status(200).send('Eliminado con exito.');
				} else {
					res.status(400).send('Ocurrio un error Eliminado el préstamo.');
				}
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}
}
export default Loan;
