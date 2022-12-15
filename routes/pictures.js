const express = require('express')
const router = express.Router();

var pictureController = require('../controllers/pictureController');

router.get('/', pictureController.findAll);

router.post('/create', pictureController.save);

router.get('/create', pictureController.saveForm);

router.get('/:id', pictureController.findById);

router.get('/edit/:id', pictureController.modifyForm);

router.post('/edit/:id', pictureController.modify);

router.get('/delete/:id', pictureController.deleteById);

console.log("[INFO] Picture Router works!")
module.exports = router;