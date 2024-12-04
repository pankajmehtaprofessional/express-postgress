const express = require('express');
const Joi = require("joi");
const { Post, User } = require('../models');
const router = express.Router();
const {validate} = require("../middlewares/common.middleware");

const createPostSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(10).required(),
    userId: Joi.number().integer().required(),
  });
  
  const updatePostSchema = Joi.object({
    title: Joi.string().min(3).max(255),
    description: Joi.string().min(10),
    userId: Joi.number().integer(),
  });

router.post('/', validate(createPostSchema), async (req, res) => {
  try {
    const user = await Post.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await Post.findAll({ 
        include: {
            model: User,
            attributes: ['fName', 'lName', 'email'],
          },
          attributes: ['id', 'title', 'description', 'userId'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await Post.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', validate(updatePostSchema), async (req, res) => {
  try {
    const user = await Post.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Post not found' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await Post.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Post not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
