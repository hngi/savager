// const { readFile } = require('fs');

// export

exports.viewTest = (req, res) => {
    res.render('index', { login: '/login', signup: '/signup' });
    // res.readFile("../index.html", "utf8", (err, data) => {
    //     if(err) console.log(err);
    //     res.send(data);
    // });
}

exports.signinView = (req, res) => {
    res.render('login', { title: 'Express' });
}

exports.signupView = (req, res) => {
    res.render('signup', { title: 'Express' });
}