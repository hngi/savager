const { readFile } = require('fs');

exports.viewTest = (req, res) => {
    // res.render('index', { title: 'Express' });
    res.readFile("../index.html", "utf8", (err, data) => {
        if(err) throw err;
        res.send(data);
    });
}