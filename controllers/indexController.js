// const { readFile } = require('fs');

// export

exports.viewTest = (req, res) => {
    res.redirect('/posts')
}

exports.signinView = (req, res) => {
    res.render('login', { title: 'Express' });
}

exports.signupView = (req, res) => {
    res.render('signup', { title: 'Express' });
}