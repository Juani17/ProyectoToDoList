const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

exports.getAllSprints = async (req, res) => {
  const sprints = await Sprint.find().populate('tareas');
  res.json(sprints);
};

exports.getSprintById = async (req, res) => {
  const sprint = await Sprint.findById(req.params.id).populate('tareas');
  if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
  res.json(sprint);
};

exports.createSprint = async (req, res) => {
  const nuevoSprint = new Sprint(req.body);
  await nuevoSprint.save();
  res.status(201).json(nuevoSprint);
};

exports.updateSprint = async (req, res) => {
  const sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
  res.json(sprint);
};

exports.deleteSprint = async (req, res) => {
  const sprint = await Sprint.findByIdAndDelete(req.params.id);
  if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
  res.json({ mensaje: 'Sprint eliminado' });
};

exports.addTaskToSprint = async (req, res) => {
  const sprint = await Sprint.findById(req.params.id);
  const task = await Task.findById(req.params.taskId);

  if (!sprint || !task) {
    return res.status(404).json({ error: 'Sprint o Tarea no encontrada' });
  }

  if (sprint.tareas.includes(task._id)) {
    return res.status(400).json({ error: 'La tarea ya está en este sprint' });
  }

  sprint.tareas.push(task._id);
  await sprint.save();

  res.json(sprint);
};
