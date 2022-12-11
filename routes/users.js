const express = require('express')
const router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.findAll);

router.post('/', userController.save);

router.get('/:id', userController.findById);

router.put('/:id', userController.modify);

router.delete('/:id', userController.deleteById);

console.log("[INFO] User Router works!")
module.exports = router;