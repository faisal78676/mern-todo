const router = require('express').Router();
const todoController = require('./task.controller');

// Get All Todo List
router.get('/',todoController.getTasks);

// Add Todo 
router.post('/add',todoController.addTask);

//Get Tod By Id
router.get('/:id',todoController.getTask);

// Update Todo
router.put('/:id',todoController.updateTask);

// Delte Tod
router.delete('/:id',todoController.deleteTask);

// Export Task

module.exports = router;
