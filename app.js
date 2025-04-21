const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json()); // para parsear JSON

//Traigo las rutas
const taskRoutes = require('./routes/tasks');
const sprintRoutes = require('./routes/sprints');
const backlogRoutes = require('./routes/backlog');

app.use('/tasks', taskRoutes);
app.use('/sprints', sprintRoutes);
app.use('/backlog', backlogRoutes);

//Me conecto a MongoDB
// Conecto a Mongo pero no detengo el servidor si falla
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB', err.message);
  });

// El servidor se inicia igual
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});

