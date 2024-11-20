-- Esta es la base de esta base de datos.
CREATE DATABASE biblioteca;

USE biblioteca;

-- Tengo 12 campos

create table ficha(
	isbn varchar(50) not null unique,
	autor varchar(50) not null,
	titulo varchar(100) not null,
	edicion int not null,
	ciudad varchar(50) not null,
	editorial varchar(50) not null,
	ano int not null,
	coleccion int not null,
	ca int not null,
	volumen int not null,
	ejemplares int not null,
	esReferencia boolean not null,
	dewey varchar(20) not null,
	cutter varchar(20) not null,
	primary key (isbn)
);

INSERT INTO ficha (isbn, autor, titulo, edicion, ciudad, editorial, ano, coleccion, ca, volumen, ejemplares, esReferencia, dewey, cutter) VALUES ("321790423", "Antoine de Saint-Exupéry", "El Principito", 1, "Puerto la cruz", "Santillana", 2000, 1, 12, 1, 3, 1, "800.34", "e34");
INSERT INTO ficha (isbn, autor, titulo, edicion, ciudad, editorial, ano, coleccion, ca, volumen, ejemplares, esReferencia, dewey, cutter) VALUES ("849234244", "Mary Shelley", "Frankenstein o El moderno Prometeo", 1, "Puerto la cruz", "Santillana", 2000, 1, 12, 1, 3, 1, "800.34", "e34");
INSERT INTO ficha (isbn, autor, titulo, edicion, ciudad, editorial, ano, coleccion, ca, volumen, ejemplares, esReferencia, dewey, cutter) VALUES ("905850234", "Brian Kernighan, Dennis Ritchie", "The C Programming Language", 1, "Puerto la cruz", "Santillana", 2000, 1, 12, 1, 3, 1, "000.34", "e34");
INSERT INTO ficha (isbn, autor, titulo, edicion, ciudad, editorial, ano, coleccion, ca, volumen, ejemplares, esReferencia, dewey, cutter) VALUES ("905850234", "Stephen Hawking", "Breve historia del tiempo: del Big Bang a los agujeros negros", 1, "Puerto la cruz", "Santillana", 2000, 1, 12, 1, 3, 1, "600.34", "e34");


-- usuarios (bibliotecario, administradores, lectores)
CREATE TABLE trabajador(
	nombre VARCHAR(50) NOT NULL,
	rol VARCHAR(30) NOT NULL, 
	contrasena VARCHAR(100) NOT NULL,
	salt VARCHAR(50) NOT NULL,
	validado BOOLEAN NOT NULL,
	PRIMARY KEY (nombre)
);

INSERT INTO trabajador (nombre, rol, contrasena, salt, validado) VALUES ("admin", "admin", "$2b$10$7BCY3G90BNE1wvFWLXCl2ekiccTTcVdQKdCiKUUOHVEdvvqizVple", "$2b$10$7BCY3G90BNE1wvFWLXCl2e", 1);
INSERT INTO trabajador (nombre, rol, contrasena, salt, validado) VALUES ("employee", "employee", "$2b$10$9YjkfEd/e3NK3WJBrlLCzejxCbLCkXDWlojQfX7nwjhbZR8r7pkq6", "$2b$10$KX/NL075vjDRgxXZ17eGGe", 1);

-- CREATE TABLE lector(
	-- cedula VARCHAR (20) NOT NULL UNIQUE,
	-- nombre VARCHAR (20) NOT NULL,
	-- apellido VARCHAR (20) NOT NULL,
	-- direccion VARCHAR (50) NOT NULL, 
	-- telefono VARCHAR (20) NOT NULL,
	-- telefonoVecino VARCHAR (20) NOT NULL,
	-- PRIMARY KEY (cedula)
-- );

-- INSERT INTO lector (cedula, nombre, apellido, direccion, telefono, telefonoVecino) VALUES ("30859232", "Guillermo", "Diaz", "Barcelona", "04128437562", "04248957342");
-- INSERT INTO lector (cedula, nombre, apellido, direccion, telefono, telefonoVecino) VALUES ("28785934", "Agustin", "Perez", "Lecheria", "041278496546", "04168974535");
-- INSERT INTO lector (cedula, nombre, apellido, direccion, telefono, telefonoVecino) VALUES ("31867485", "Julina", "Moros", "Puerto la cruz", "0412847364", "04249382736");



CREATE TABLE prestamo(
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
	fk_isbn VARCHAR(50) NOT NULL,
	fk_trabajador VARCHAR (50) NOT NULL,
	fecha_inicio DATETIME NOT NULL,
	fecha_final DATETIME NOT NULL,
	dias INT NOT NULL,
	cedula VARCHAR (20) NOT NULL,
	nombre VARCHAR (20) NOT NULL,
	apellido VARCHAR (20) NOT NULL,
	direccion VARCHAR (50) NOT NULL, 
	telefono VARCHAR (20) NOT NULL,
	telefonoVecino VARCHAR (20) NOT NULL,
	estado BOOLEAN NOT NULL,
	PRIMARY KEY (fk_isbn, cedula),
	FOREIGN KEY (fk_trabajador) REFERENCES trabajador (nombre) ON DELETE CASCADE,
	FOREIGN KEY (fk_isbn) REFERENCES ficha (isbn) ON DELETE CASCADE
	-- FOREIGN KEY (fk_cedula) REFERENCES lector (cedula) ON DELETE CASCADE 
);

INSERT INTO prestamo (fk_isbn, fk_trabajador, fecha_inicio, fecha_final, dias, cedula, nombre, apellido, direccion, telefono, telefonoVecino, estado) VALUES ("321790423", "admin","2024-10-1", "2024-10-3", 3, "30859232", "Guillermo", "Diaz", "Barcelona", "04128437562", "04248957342", 1); 
INSERT INTO prestamo (fk_isbn, fk_trabajador, fecha_inicio, fecha_final, dias, cedula, nombre, apellido, direccion, telefono, telefonoVecino, estado) VALUES ("849234244", "employee","2024-10-1", "2024-10-3", 3, "30859232", "Guillermo", "Diaz", "Barcelona", "04128437562", "04248957342", 1); 
