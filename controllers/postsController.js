const { render } = require("../app");
const Post = require('../models/post')

exports.allPosts = (req, res) => {
    res.render("posts", {  title: "View All Savages" });
}

exports.uploadFile = (req, res) => {
    res.json(req.imageUrl);
    let post = new Post()
}