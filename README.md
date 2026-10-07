# API de tareas, sprints y backlog

Proyecto académico de backend con Node.js, Express y MongoDB/Mongoose. Permite gestionar tareas, agruparlas en sprints y mantener un backlog. Incluye Docker Compose para iniciar MongoDB localmente.

## Funcionalidades y estructura

- Operaciones CRUD sobre tareas y sprints.
- Consulta de tareas por estado y orden por fecha límite.
- Creación y consulta del backlog; asociación de tareas al backlog y a sprints.
- Rutas en `routes/`, manejo de solicitudes en `controllers/` y modelos en `models/`.

Las rutas base son `/tasks`, `/sprints` y `/backlog`. El servidor se inicia desde `app.js`.

## Ejecución local

Requisitos: Node.js, npm y MongoDB; Docker Compose es opcional si ya se dispone de una base de desarrollo. No se declara una versión específica de Node.js.

```bash
npm install
cp .env.example .env
docker compose up -d
npm run dev
```

En PowerShell, usar `Copy-Item .env.example .env`. Reemplazar los valores de ejemplo antes de iniciar MongoDB. `MONGO_USER` y `MONGO_PASS` configuran el contenedor; `MONGO_URI` configura Mongoose y debe utilizar las mismas credenciales. `PORT` es opcional, con valor predeterminado `3002`. Codificar los caracteres especiales de usuario y contraseña cuando formen parte de la URI.

Los datos locales del contenedor se guardan en `mongo/`; las dependencias se reinstalan con npm. Ninguno de esos directorios debe versionarse.

## Estado

Ejercicio académico, sin autenticación implementada. La eliminación de tareas tiene un problema conocido: el controlador utiliza `Sprint` sin importarlo. Se documenta la limitación y se conserva el código original.

[ApiToDoList](https://github.com/Juani17/ApiToDoList) conserva otra variante del ejercicio. No se fusionó su código con este proyecto.
