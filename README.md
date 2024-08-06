# Como inicializar el proyecto

- Debe existir una db de nombre ecomfast o en su defecto modificar ./src/config/db.ts

- Debe de haber instalado las dependencias con npm i

- Debe ejecutar el comando npm start, luego podra hacer uso del proyecto en el puerto 3000

#### Ejecute a manera de seeders los siguentes comandos directamente en la query:

- create database ecomfast;\
use ecomfast;\

###### Aqui Debe ejecutar el programa para que se carguen los modelos
- insert into roles(name, createdAt, updatedAt) values("Admin", now(), now());
- insert into roles(name, createdAt, updatedAt) values("Client", now(), now());
- insert into entity(name, createdAt, updatedAt) values("Order", now(), now());
- insert into entity(name, createdAt, updatedAt) values("User", now(), now());
- insert into users(email,password,roleId, createdAt, updatedAt) values("admin@correo.com", "admin123", 1, now(), now());
- insert into users(email,password,roleId, createdAt, updatedAt) values("normal@correo.com", "normal123", 2, now(), now());
- insert into permissions(roleId, entityId, canCreate, canUpdate, canDelete, canGet, createdAt, updatedAt) values(2,2, true, true, true, true, now(), now());
- insert into permissions(roleId, entityId, canCreate, canUpdate, canDelete, canGet, createdAt, updatedAt) values(1,1, true, true, false, true, now(), now());