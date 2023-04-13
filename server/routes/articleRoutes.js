const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const authenticate = require('../utils/authMiddleware');
const authorize = require('../utils/authorize');

router.post('/', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const articles = await Article.findAll({ include: [{ model: Enterprise }] });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      await article.update(req.body);
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      await article.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;