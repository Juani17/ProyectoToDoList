const Backlog = require('../models/Backlog');
const Task = require('../models/Task');


exports.getBacklog = async (req, res) => {
  const backlog = await Backlog.findOne().populate('tareas');
  if (!backlog) return res.status(404).json({ error: 'Backlog no encontrado' });
  res.json(backlog);
};

exports.createBacklog = async (req, res) => {
  const existe = await Backlog.findOne();
  if (existe) return res.status(400).json({ error: 'Ya existe un backlog' });

  const nuevoBacklog = new Backlog({ tareas: [] });
  await nuevoBacklog.save();
  res.status(201).json(nuevoBacklog);
};

exports.addTaskToBacklog = async (req, res) => {
  const backlog = await Backlog.findOne();
  const task = await Task.findById(req.params.taskId);

  if (!backlog || !task) {
    return res.status(404).json({ error: 'Backlog o Tarea no encontrada' });
  }

  if (backlog.tareas.includes(task._id)) {
    return res.status(400).json({ error: 'La tarea ya está en el backlog' });
  }

  backlog.tareas.push(task._id);
  await backlog.save();

  res.json(backlog);
};
