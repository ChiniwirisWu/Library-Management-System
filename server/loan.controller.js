import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

async function getLoan_handler(req, res){
	const { cedula, isbn } = req.params;
	const [rows, columns] = await pool.execute('SELECT * FROM prestamo WHERE cedula = ? AND fk_isbn = ?', [cedula, isbn]);
	return rows;
}

const Loan = {
	getAllLoans: async (req, res)=>{
		try {
			const [rows, columns] = await pool.execute('SELECT p.id, f.isbn, p.cedula, p.nombre, p.fk_trabajador, p.fecha_inicio, p.dias, p.telefono, p.direccion, p.telefonoVecino, f.titulo FROM prestamo p LEFT JOIN ficha f ON p.fk_isbn = f.isbn');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getAllRequestedLoans: async (req, res)=>{
		try {
			const [rows, columns] = await pool.execute('SELECT p.id, f.isbn, p.cedula, p.nombre, p.fk_trabajador, p.fecha_inicio, p.dias, p.telefono, p.direccion, p.telefonoVecino, f.titulo FROM prestamo p LEFT JOIN ficha f ON p.fk_isbn = f.isbn WHERE p.estado=0');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getAllOngoingLoans: async (req, res)=>{
		try {
			const [rows, columns] = await pool.execute('SELECT p.id, f.isbn, p.cedula, p.nombre, p.fk_trabajador, substring(p.fecha_inicio, 1, 10) as fecha_inicio, p.dias, p.telefono, p.direccion, p.telefonoVecino, f.titulo FROM prestamo p LEFT JOIN ficha f ON p.fk_isbn = f.isbn WHERE p.estado=1');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getLoan: async (req, res)=>{
		try{
			const Loan = await getLoan_handler(req, res);
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
			console.log(body);
			const [f_rows, f_columns] = await pool.execute('SELECT titulo, ejemplares, esReferencia FROM ficha WHERE isbn = ?', [body.fk_isbn]);
			const [p_rows, p_columns] = await pool.execute('SELECT COUNT(fk_isbn) as n_prestamos FROM prestamo WHERE fk_isbn = ?', [body.fk_isbn]);
			console.log(f_rows);
			console.log(p_rows);

			if(f_rows[0].esReferencia == 1) return res.status(500).send("Un libro de referencia no puede ser prestado.");

			if(p_rows[0].n_prestamos < f_rows[0].ejemplares - 1){
				const [rows, columns] = await pool.execute('INSERT INTO prestamo (fk_isbn, fk_trabajador, fecha_inicio, dias, cedula, nombre, apellido, direccion, telefono, telefonoVecino, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [body.fk_isbn, body.fk_trabajador, body.fecha_inicio, body.dias, body.cedula, body.nombre, body.apellido, body.direccion, body.telefono, body.telefonoVecino, 0]);
				if(rows.affectedRows > 0){
					res.status(200).send('Préstamo creado con éxito.');
				} else{
					res.status(400).send('Hubo un error creando el préstamo.');
				}
			} else {
				res.status(400).send('No hay ejemplares disponibles.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	},
	updateLoan: async (req, res)=>{
		try {
			const { cedula, isbn } = req.params;
			const { body } = req;
			const [rows, columns] = await pool.execute('UPDATE prestamo SET fk_isbn = ?, fk_trabajador = ?, fecha_inicio = ?, dias = ?, cedula = ?, nombre = ?, apellido = ?, direccion = ?, telefono = ?, telefonoVecino = ?, estado = ? WHERE cedula = ? AND fk_isbn = ?', [body.isbn, body.trabajador, body.fecha_inicio, body.fecha_final, body.dias, body.cedula, body.nombre, body.apellido, body.direccion, body.telefono, body.telefonoVecino, body.estado, cedula, isbn]);
			if(rows.affectedRows > 0){
				res.status(200).send('Préstamo actualizado con éxito.');
			} else{
				res.status(400).send('Hubo un error creando el préstamo.');
			} 		
		} catch (e) {
			res.status(400).send(e.message);
		}
	}, 
	validateLoan: async (req, res)=>{
		try {
			const { cedula, isbn } = req.params;
			const [rows, columns] = await pool.execute('UPDATE prestamo SET estado = ? WHERE cedula = ? AND fk_isbn = ?', [1, cedula, isbn]);
			if(rows.affectedRows > 0){
				res.status(200).send('Préstamo validado con éxito.');
			} else{
				res.status(400).send('Hubo un error validando el préstamo.');
			} 		
		} catch (e) {
			res.status(400).send(e.message);
		}
	}, 
	deleteLoan: async (req, res)=>{
		try {
			const { cedula, isbn } = req.params;
			const response = await getLoan_handler(req, res);
			if(response.length > 0){
				const [rows, columns] = await pool.execute('DELETE FROM prestamo WHERE cedula = ? AND fk_isbn = ?', [cedula, isbn]);
				if(rows.affectedRows > 0) {
					res.status(200).send('Eliminado con exito.');
				} else {
					res.status(400).send('Ocurrio un error Eliminado el préstamo.');
				}
			} else {
				res.status(400).send('No se encontro el prestamo.');
			}

		} catch (e) {
			res.status(400).send(e.message);
		}
	}
}
export default Loan;
