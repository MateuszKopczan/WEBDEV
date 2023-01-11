const express = require('express')
const router = express.Router();

var userController = require('../controllers/userController');

router.post('/register', userController.register);
router.get('/register', userController.showRegisterForm);

router.post('/login', userController.login);
router.get('/login', userController.showLoginForm);

router.get('/', userController.findAll);
router.post('/', userController.save);

router.get('/:id', userController.findById);
router.put('/:id', userController.modify);

router.delete('/:id', userController.deleteById);

console.log("[INFO] User Router works!")
module.exports = router;