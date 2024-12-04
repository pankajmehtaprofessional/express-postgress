const express = require('express');
const { Comment, Post, User } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = await Comment.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await Comment.findAll({
      include: [
        {
          model: Post,
        },
        {
          model: User,
        },
      ]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await Comment.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await Comment.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await Comment.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
