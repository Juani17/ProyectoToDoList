const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  const filter = req.query.estado ? { estado: req.query.estado } : {};
  const tasks = await Task.find(filter).sort('fechaLimite');
  res.json(tasks);
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
};

exports.createTask = async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
};


exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

  //Verifico si la tarea está en algún Sprint
  const sprintConTarea = await Sprint.findOne({ tareas: task._id });
  if (sprintConTarea) {
    return res.status(400).json({ error: 'No se puede eliminar una tarea asignada a un sprint' });
  }

  await Task.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Tarea eliminada' });
};