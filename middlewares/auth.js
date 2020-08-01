const auth = (req, res) => {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/users/signup');
    }
}

module.exports = auth;