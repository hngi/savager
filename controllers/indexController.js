// const { readFile } = require('fs');

// export

exports.viewTest = (req, res) => {
    res.redirect('/posts')
}

exports.loginView = (req, res) => {
    if (req.error) {
        res.render('login', { error: req.error.message });
    }
    res.render('login', { title: 'Express' });
}

exports.signupView = (req, res) => {
    res.render('signup', { title: 'Express', error: null });
}