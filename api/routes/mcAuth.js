module.exports = app => {
  const controller = require('../controllers/mcAuth')();

  app.route('/authenticate')
    .post(controller.authUser);
}
