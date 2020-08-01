// const { readFile } = require('fs');

// export

exports.viewTest = (req, res) => {
    // res.redirect('/posts')
    res.render('index');
}

exports.loginView = (req, res) => {
    res.render('login', { title: 'Login', error: null });
}

exports.signupView = (req, res) => {
    res.render('signup', { title: 'SignUp', error: null });
}

exports.aboutUsView = (req, res) => {
    res.render('about_us', {title: 'About Us', error: null});
}

exports.contactUsView = (req, res) => {
    res.render('contact', {title: 'Contact Us', error: null});
}

exports.leaderboardView = (req, res) => {
    res.render('leaderboard', {title: 'Leaderboard', error: null});
}

exports.footballView = (req, res) => {
    res.render('football', {title: 'Football', error: null});
}

exports.sectionsView = (req, res) => {
    res.render('random', {title: 'Random', error: null});
}

exports.countryMemesView = (req, res) => {
    res.render('country_sec', {title: 'Country Memes', error: null});
}

exports.Views = (req, res) => {
    res.render('views', {title: 'Views', error: null});
}