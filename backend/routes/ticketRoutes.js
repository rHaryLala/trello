const express = require('express');
const Ticket = require('../models/Ticket');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Create a new ticket
router.post('/', verifyToken, async (req, res) => {
  const { name, description, status, estimationDate, project, assignees } = req.body;
  const creator = req.userId;

  try {
    const ticket = new Ticket({ name, description, status, estimationDate, project, assignees, creator });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all tickets for a project
router.get('/project/:projectId', verifyToken, async (req, res) => {
  const { projectId } = req.params;

  try {
    const tickets = await Ticket.find({ project: projectId });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a ticket
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, status, estimationDate, assignees } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(id, { name, description, status, estimationDate, assignees }, { new: true });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a ticket
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (ticket.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only the ticket creator can delete the ticket' });
    }
    await ticket.remove();
    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;