const express = require('express');

const userRoutes = require('./routes/userRoutes');
const enterpriseRoutes = require('./routes/enterpriseRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');

const server = express();

server.use(express.json());

server.use('/api/users', userRoutes);
server.use('/api/enterprises', enterpriseRoutes);
server.use('/api/articles', articleRoutes);
server.use('/api/auth', authRoutes);

module.exports = server;