const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.getById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new todo
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const todo = await Todo.create(text.trim());
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE todo
router.put('/:id', async (req, res) => {
  try {
    const { text, completed } = req.body;
    const todo = await Todo.update(req.params.id, { text, completed });
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TOGGLE complete status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.toggleComplete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.delete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;