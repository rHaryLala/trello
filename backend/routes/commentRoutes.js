const express = require('express');
const Comment = require('../models/Comment');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Create a new comment
router.post('/', verifyToken, async (req, res) => {
  const { content, ticket } = req.body;
  const author = req.userId;

  try {
    const comment = new Comment({ content, author, ticket });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all comments for a ticket
router.get('/ticket/:ticketId', verifyToken, async (req, res) => {
  const { ticketId } = req.params;

  try {
    const comments = await Comment.find({ ticket: ticketId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a comment
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findById(id);
    if (comment.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only the comment author can update the comment' });
    }
    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a comment
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (comment.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only the comment author can delete the comment' });
    }
    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;