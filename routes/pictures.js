const express = require('express')
const router = express.Router();

var pictureController = require('../controllers/pictureController');
var authenticate = require('../middleware/authenticate');

router.get('/', pictureController.findAll);

router.post('/create',  pictureController.save);

router.get('/create',  pictureController.saveForm);

router.get('/:id', pictureController.findById);

router.get('/edit/:id', authenticate,  pictureController.modifyForm);

router.post('/edit/:id', authenticate,  pictureController.modify);

router.get('/delete/:id', authenticate, pictureController.deleteById);

console.log("[INFO] Picture Router works!")
module.exports = router;