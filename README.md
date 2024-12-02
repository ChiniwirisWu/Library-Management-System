# Library-Management-System

## Languages / Idiomas

- [🇺🇸 English](#english-documentation)
- [🇪🇸 Español](#documentacion-en-español)

## 🇺🇸 English Documentation

This repository hosts a project corresponding to a local library management website that has been proposed as a community service project for the Computer Engineering career. It contains two main folders, ```app``` and ```server```, where the code for both the website design and the server, respectively, can be found.

> [!NOTE]
> Among the technologies that were used, based on ```JavaScript```:  ```React``` to build the ```UI``` with ```Tailwind``` directly used in the ```JSX``` code, and a mix of ```Node.js```, ```Express.js```,  and ```MySQL2``` to create the server.

Source Code made by:
> @DanielRamirez404 @ChiniwirisWu @guillermosilvam @Vinekko @Kyiroz

### Deployment Requirement

* To download ```Node.js``` (includes the ```NPM``` package manager).
* To download any web browser, such as ```Google Chrome```.
* To download any MySQL-based ```DBMS```.

> [!TIP]
> XAMPP is suitable for those who have no experience with ```DBMS```, due to its being easy to use.

### How to Deploy

Deployment is, fortunately, pretty easy. It can be sorted into the following sections, all of which are executed from the computer that act as the server.

#### Source Code Download

The source code may be downloaded directly from its ```GitHub``` repository as a ```.zip``` file so that it can be unzipped later to the desired directory.

> [!NOTE]
> Repository link: https://github.com/DanielRamirez404/Library-Management-System.

> [!IMPORTANT]
> There should be internet access when downloading the ```.zip``` file.

> [!TIP]
> ```git``` may also be used to clone the repository, instead.

#### Local ```IPv4``` Address Identification

> [!IMPORTANT]
> This step is required so that all server request may be correctly executed.
> Fortunantely, it's only neccessary to do so once, considering no future changes on the local ```IPv4``` address.

Using any given text editor, the ```[project]/app/src/constants/host_ip.js``` one-line file must be modify. By default, it contains the following line:

**host_ip.js:**
```
export const host_ip = 'http://127.0.0.1:9090';
```

The local ```IPv4``` address must be changed to that which is actually being currently used by the computer, making sure that the format is not altered by any means.

Example with the ```192.168.0.100``` ```IPv4``` address:

**host_ip.js**
```
export const host_ip = 'http://192.168.0.100:9090';
```

> [!WARNING]
> It's highly important to make sure that the format remains being the same, so to speak: a ```URL``` which uses ```HTTP``` followed by the local ```IPv4``` address and the ```9090``` port; all that enclosed by either single or doubles quotes (```''``` or ```""```) to be successfully regarded as a ```string```.

#### Database Connexion

> [!IMPORTANT]
> This step is required to enable storage and modification of the website's info.
> Fortunately, it's only neccessaty to do so once, considering no user-related changes on the used ```DBMS```. 

First, a new user should be created on the ```DBMS```, considering that this data must match with those shown at the ```[project]/app/server/.env``` file. 

> [!TIP]
> In this file, it's recommended to change both the user and password as needed, using any text editor.
> Now an example featuring the ```Admin``` username and ```12345``` password:

**.env:**
```
MYSQL_HOST = "127.0.0.1"
MYSQL_USER = "Admin"
MYSQL_PASSWORD = "12345"
MYSQL_DATABASE = "biblioteca"
SECRET = "conejosEspaciales"
```

Immediately, it's mandatory to import the ```[project]/app/server/.env``` file into the ```DBMS```, so that the database could be created with its full scheme and some default entries. 

#### Packages' Downloads

> [!IMPORTANT]
> This step is required to get the packages that lead to a correct file execution when hosting the website.
> It's only required if they have not been already downloaded.

In order to do so, it's necessary to use the terminal and run the ```npm i``` command on both the ```[project]/app``` and the ```[project]/server``` directories, as follows: 

```
[project]/app>npm i
```

```
[project]/server>npm i
```

> [!IMPORTANT]
> As expected, this step needs to have internet access.

#### Hosting

> [!IMPORTANT]
> This step is required to host the website with its operation.
> It's needed only when there's a need for hosting the project so that any local device can access to it.


1. To turn the ```DBMS``` on.
   
2. To host the website. In order to do so, it's required to make use the terminal to run the following command on the ```[project]/app``` directory:
```
[project]/app>npm start
```

3. To host the server. In order to do so, it's required to to make use the terminal to run the following command on the ```[project]/server``` directory:
```
[project]/server>node app.js
```

> [!IMPORTANT]
> Both terminals must be kept running so that the website can be accessed throughout the local network. Nonetheless, if there's a need to end execution, the ```Ctrl + C``` shortcut may be used on each one of them. On top of that, the ```DBMS``` might also be stopped.

> [!NOTE]
> By default, the website is hosted on the port 3000, and the server on the port 9090. 

#### ```QR``` Creation

If desired, a ```QR``` code may be created so that the website can be accessed to way more easily. There are several websites which provides this ```text-to-QR``` generating services for free, such as https://www.qr-code-generator.com/. Keep on mind that the text that corresponds to the deployed website should be a ```URL``` which uses ```HTTP``` followed by the local ```IPv4``` address and the ```3000``` port. Example with the ```192.168.0.100``` ```IPv4``` address: 

```
http://192.168.0.100:3000
```

### Accessing the Website 

Onces hosted, from any device on the same local network, it's possible to connect to the website by using the ```QR``` code created previously or adding the already explained ```URL``` on any web browser.

## 🇪🇸 Documentación en Español

Este repositorio aloja un proyecto que corresponde a un sitio web local de gestión bibliotecaria que ha sido propuesto como proyecto de servicio comunitario de la carrera de ingeniería informática. Comprende dos carpetas principales, ```app``` y ```server```, donde se encuentran el código para el diseño de la página web y el del servidor, respectivamente.

> [!NOTE]
> Entre las tecnologías utilizadas, en base a ```JavaScript```:  ```React``` para la interfaz de usuario junto a ```Tailwind``` utilizado directamente en el código ```JSX```, y una combinación de ```Node.js```, ```Express.js```,  y ```MySQL2``` para el servidor.

Participantes en el Código Duente:
> @DanielRamirez404 @ChiniwirisWu @guillermosilvam @Vinekko @Kyiroz

### Requisitos de Implementación

* Descargar ```Node.js``` (incluye al gestor de paquetes ```NPM```).
* Descargar algún navegador web, tal como ```Google Chrome```.
* Descargar algún gestor de bases de datos basado en MySQL.

> [!TIP]
> En caso de inexperiencia con la base de datos, se recomienda utilizar XAMPP.

### Cómo Implementar

La implementación es, afortunadamente, sencilla. Se puede dividir en las siguientes funciones, todas implementadas desde la computadora que cumplirá el rol de servidor:

#### Descarga del Proyecto

Se puede descargar el proyecto directamente desde su repositorio en ```GitHub``` como un archivo ```.zip```. Para su posterior descompresión en el directorio deseado.

> [!NOTE]
> Link del reposotorio: https://github.com/DanielRamirez404/Library-Management-System.

> [!IMPORTANT]
> Al descargar el ```.zip```, se requiere acceso a internet.

> [!TIP]
> De poseerse ```git```, también se puede clonar el repositorio, en su lugar.

#### Determinación de la Dirección ```IPv4``` Local

> [!IMPORTANT]
> Este paso es requerido para que las peticiones al servidor sean ejecutadas de forma adecuada.
> Afortunadamente, es solo necesario hacerse una vez, en un escenario donde la dirección ```IPv4``` local no cambia.

Con cualquier editor de texto, se debe dirigirse al archivo ```[proyecto]/app/src/constants/host_ip.js```, el cual posee solo una línea, siendo, por defecto,la siguiente:

**host_ip.js:**
```
export const host_ip = 'http://127.0.0.1:9090';
```

Es necesario modificar la dirección ```IPv4``` local a aquella que posea actualmente el equipo, asegurando que el formato siga siendo el mismo.

Ejemplo con dirección ```IPv4``` ```192.168.0.100```:

**host_ip.js**
```
export const host_ip = 'http://192.168.0.100:9090';
```

> [!WARNING]
> Es debido asegurarse de que el formato sea el mismo, a saber: una ```URL``` que utilice ```HTTP``` seguido de la dirección ```IPv4``` local y el puerto ```9090```; todo ello rodeado de comillas simples o dobles (```''``` o ```""```) para ser considerado como texto.

#### Conexión a la Base de Datos

> [!IMPORTANT]
> Este paso es requerido para almacenar y modificar la información del sitio web.
> Afortunadamente, es solo necesario hacerse una vez, en caso de que no se cambie de usuario en el gestor de base de datos utilizado.

Primeramente, se debe crear un usuario en el gestor de la base de datos a utilizar, tomando en cuenta que estos datos deben coincidir con los mostrados en el archivo ```[proyecto]/app/server/.env```. 

> [!TIP]
> En dicho archivo, se recomienda modificar el usuario y contraseña según corresponda, utilizando cualquier editor de texto.
> Ejemplo a continuación con el usuario ```Administrador``` y la contraseña ```12345```:

**.env:**
```
MYSQL_HOST = "127.0.0.1"
MYSQL_USER = "Administrador"
MYSQL_PASSWORD = "12345"
MYSQL_DATABASE = "biblioteca"
SECRET = "conejosEspaciales"
```

Seguidamente, utilizando el gestor de base de datos, se debe importar el archivo ```[proyecto]/app/server/.env```, para crear la base de datos con su esquema completo y algunas entradas iniciales.

#### Descarga de Paquetes
> [!IMPORTANT]
> Este paso es requerido para poseer los paquetes que permiten la ejecución correcta del sitio web.
> Se requiere cada vez que no se hayan descargado.

Para ello, es necesario utilizar la terminal y dirigirse hacia estas carpetas: ```[proyecto]/app``` y ```[proyecto]/server```, y escribir el comando ```npm i``` en cada una de ellas, de la siguiente manera:

```
[proyecto]/app>npm i
```

```
[proyecto]/server>npm i
```

> [!IMPORTANT]
> Evidentemente, al descargar paquetes de la web, este paso requiere acceso a internet.

#### Alojamiento

> [!IMPORTANT]
> Este paso es requerido para alojar la página y su funcionamiento.
> Se requiere cada vez que se quiera alojar el proyecto.

1. Encender el gestor de base de datos a utilizar.
   
2. Alojar el sitio web. Para ello se debe dirigirse, usando la terminal, a la carpeta ```[proyecto]/app``` y ejecutar el siguiente comando:
```
[proyecto]/app>npm start
```

3. Alojar el servidor. Para ello, se debe dirigirse, usando la terminal, a la carpeta ```[proyecto]/server``` y ejecutar el siguiente comando:
```
[proyecto]/server>node app.js
```

> [!IMPORTANT]
> Ambas terminales deben mantenerse abiertas para que el sitio web sea accesible a través de la red local. No obstante, si se desea finalizar su ejecución, se puede utilizar, dentro de cada terminal, la combinación de teclas ```Ctrl + C```, la cual finalizará la ejecución. Asimismo, se puede detener el gestor de base de datos si se desea.

> [!NOTE]
> Por defecto, el sitio web se aloja en el puerto 3000 de la computadora, mientras que el servidor se aloja en el puerto 9090. 

#### Creación de ```QR```s

Si se desea crear algún código ```QR``` para el acceso directo al sitio web desde cualquier otro dispositivo conectado a la misma red, se puede colocar una ```URL``` que utilice ```HTTP``` seguido de la dirección ```IPv4``` local y el puerto ```3000``` en cualquier página web que permita la conversión de texto a ```QR```, tal y como: https://www.qr-code-generator.com/. Ejemplo con la dirección ```IPv4``` local ```192.168.0.100```:

```
http://192.168.0.100:3000
```

### Cómo Acceder al Sitio Web

Una vez alojado, desde cualquier dispositivo de la misma red, es posible conectarse al sitio web utilizando el código ```QR``` previamente creado o colocando la ```URL``` previamente explicada en cualquier navegador web.
