const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
	const sequelize = require('./server/config/database');
  const express = require('./server');

  express.get('*', (req, res) => {
    return handle(req, res);
  });

  sequelize.sync().then(() => {
    express.listen(3000, (err) => {
      if (err) throw err;
    });
  });
});
