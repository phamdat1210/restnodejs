const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middlewares');

const isAuth = authMiddleware.isAuth;
// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/User.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/', user_controller.save_user)
router.get('/', user_controller.findAll)
router.get('/:id', isAuth, user_controller.findById)
router.put('/:id/update', user_controller.update)
router.delete('/:id/delete', isAuth, user_controller.delete)
module.exports = router;