const express = require('express')
const router = express.Router();

var pictureController = require('../controllers/pictureController');

router.get('/', pictureController.findAll);

router.post('/', pictureController.save);

router.get('/:id', pictureController.findById);

router.put('/:id', pictureController.modify);

router.delete('/:id', pictureController.deleteById);

console.log("[INFO] Picture Router works!")
module.exports = router;