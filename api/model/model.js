const thinkagain = require('thinkagain')();

var Gallery = thinkagain.createModel('Gallery', {
    type: 'object',
    properties: {
        id: { type: 'string'},
        name: { type: 'string'}
    }
});

var Image = thinkagain.createModel('Image', {
    type: 'object',
    properties: {
        id: { type: 'string'},
        title: { type: 'string'},
        description: { type: 'string'},
        date: { type: 'string', format:'date-time'},
        path: { type: 'string'},
        size: { type: 'string'},
    },
    required: ['title', 'path']
});

Image.belongsTo(Gallery, 'gallery', 'gallerId', 'id');

exports.Image = Image;
exports.Gallery = Gallery;