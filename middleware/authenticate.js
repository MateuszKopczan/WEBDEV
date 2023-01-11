const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try{
        var token = '';
        if (typeof localStorage != "undefined" && localStorage != null){
            token = localStorage.getItem('token')
        }
        const decode = jwt.verify(token, 'kodSzyfrujacy');
        req.user = decode
        next()
    } catch (err){
        res.render('401', {})
    }
}

module.exports = authenticate