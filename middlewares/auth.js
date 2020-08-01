const auth = (req, res, next) => {
    if(req.session.user) {
        next();
    } else {
        return res.redirect('/users/signup');
    }
}

module.exports = auth;