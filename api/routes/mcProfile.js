module.exports = app => {
  const controller = require('../controllers/mcProfile')();

  app.route('/session/minecraft/profile/:uuid')
    .get(controller.getPlayerProfile);
}
