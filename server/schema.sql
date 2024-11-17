-- Esta es la base de esta base de datos.
CREATE DATABASE biblioteca;

USE biblioteca;

-- Tengo 12 campos
CREATE TABLE categoria(
	codigo INT NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	PRIMARY KEY(codigo)
);

INSERT INTO categoria (codigo, nombre) VALUES (200, "Literatura");
INSERT INTO categoria (codigo, nombre) VALUES (400, "Ciencia");
INSERT INTO categoria (codigo, nombre) VALUES (300, "Humanidades");

CREATE TABLE sala(
	codigo VARCHAR (10) NOT NULL,
	nombre VARCHAR (50) NOT NULL,
	PRIMARY KEY (codigo)
);

INSERT INTO sala (codigo, nombre) VALUES ("P1-CS", "Ciencias Sociales - Piso 1");
INSERT INTO sala (codigo, nombre) VALUES ("P1-HC", "Hugo Chavez - Piso 1");
INSERT INTO sala (codigo, nombre) VALUES ("P2-TI", "Tecnología Informática - Piso 2");

CREATE TABLE codigo_de_sala(
	fk_codigo_categoria INT NOT NULL,
	fk_codigo_sala VARCHAR (10) NOT NULL,
	FOREIGN KEY (fk_codigo_categoria) REFERENCES categoria (codigo) ON DELETE CASCADE,
	FOREIGN KEY (fk_codigo_sala) REFERENCES sala (codigo) ON DELETE CASCADE
);

INSERT INTO codigo_de_sala (fk_codigo_categoria, fk_codigo_sala) VALUES (200,"P1-CS");
INSERT INTO codigo_de_sala (fk_codigo_categoria, fk_codigo_sala) VALUES (300,"P1-HC");
INSERT INTO codigo_de_sala (fk_codigo_categoria, fk_codigo_sala) VALUES (400,"P2-TI");


create table ficha(
	isbn varchar(50) not null unique,
	autor varchar(50) not null,
	titulo varchar(50) not null,
	edicion int not null,
	ciudad varchar(50) not null,
	editorial varchar(50) not null,
	ano int not null,
	coleccion int not null,
	ca int not null,
	volumen int not null,
	ejemplar varchar(50) not null,
	categoria int not null,
	prestable boolean not null,
	primary key (isbn),
	foreign key (categoria) references categoria (codigo) on delete cascade
);

INSERT INTO ficha (isbn, autor, titulo, edicion, ciudad, editorial, ano, coleccion, ca, volumen, ejemplar,categoria, prestable) VALUES ("321790423", "David Gutierrez", "Pikachu rojo", 1, "Puerto la cruz", "Santillana", 2000, 1, 12, 1, 3, 200, 1);
INSERT INTO ficha (isbn, autor, titulo, edicion, ciudad, editorial, ano, coleccion, ca, volumen, ejemplar,categoria, prestable) VALUES ("409234803", "Maria de la Cruz", "Agua dulce", 1, "Puerto la cruz", "Girasol", 2003, 1, 12, 2, 3, 400, 1);
INSERT INTO ficha (isbn, autor, titulo, edicion, ciudad, editorial, ano, coleccion, ca, volumen, ejemplar,categoria, prestable) VALUES ("789543754", "Ozamu Dazai", "No longer human", 1, "Barcelona", "Kioto Books", 1980, 1, 13, 1, 3, 200, 1);


-- usuarios (bibliotecario, administradores, lectores)
CREATE TABLE trabajador(
	nombre VARCHAR(50) NOT NULL,
	rol VARCHAR(30) NOT NULL, 
	contrasena VARCHAR(100) NOT NULL,
	salt VARCHAR(50) NOT NULL,
	validado BOOLEAN NOT NULL,
	PRIMARY KEY (nombre)
);

INSERT INTO trabajador (nombre, rol, contrasena, salt, validado) VALUES ("Oscar", "trabajador", "ieaf3433_jfadsfasd", "jfi2318bfasd_#", 1);
INSERT INTO trabajador (nombre, rol, contrasena, salt, validado) VALUES ("Carmen", "trabajador", "kfas08342-@jfa", "jf89345^jldaf", 1);
INSERT INTO trabajador (nombre, rol, contrasena, salt, validado) VALUES ("Jorge", "administrador", "kfasfjk#$jkfasd", "kfir84jf3", 0);

CREATE TABLE lector(
	cedula VARCHAR (20) NOT NULL UNIQUE,
	nombre VARCHAR (20) NOT NULL,
	apellido VARCHAR (20) NOT NULL,
	direccion VARCHAR (50) NOT NULL, 
	telefono VARCHAR (20) NOT NULL,
	telefonoVecino VARCHAR (20) NOT NULL,
	PRIMARY KEY (cedula)
);

INSERT INTO lector (cedula, nombre, apellido, direccion, telefono, telefonoVecino) VALUES ("30859232", "Guillermo", "Diaz", "Barcelona", "04128437562", "04248957342");
INSERT INTO lector (cedula, nombre, apellido, direccion, telefono, telefonoVecino) VALUES ("28785934", "Agustin", "Perez", "Lecheria", "041278496546", "04168974535");
INSERT INTO lector (cedula, nombre, apellido, direccion, telefono, telefonoVecino) VALUES ("31867485", "Julina", "Moros", "Puerto la cruz", "0412847364", "04249382736");



CREATE TABLE prestamo(
	id INT NOT NULL AUTO_INCREMENT,
	fk_cedula VARCHAR (20) NOT NULL,
	fk_isbn VARCHAR(50) NOT NULL,
	fk_trabajador VARCHAR (50) NOT NULL,
	fecha_inicio DATETIME NOT NULL,
	fecha_final DATETIME NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_trabajador) REFERENCES trabajador (nombre) ON DELETE CASCADE,
	FOREIGN KEY (fk_isbn) REFERENCES ficha (isbn) ON DELETE CASCADE,
	FOREIGN KEY (fk_cedula) REFERENCES lector (cedula) ON DELETE CASCADE
);

INSERT INTO prestamo (fk_cedula, fk_isbn, fk_trabajador, fecha_inicio, fecha_final) VALUES ("30859232", "321790423", "Oscar","2024-10-1", "2024-10-3"); 
INSERT INTO prestamo (fk_cedula, fk_isbn, fk_trabajador, fecha_inicio, fecha_final) VALUES ("28785934", "409234803", "Carmen","2024-10-5", "2024-10-8"); 
INSERT INTO prestamo (fk_cedula, fk_isbn, fk_trabajador, fecha_inicio, fecha_final) VALUES ("31867485", "789543754", "Jorge","2024-09-20", "2024-09-23"); 
