const { render } = require("../app");

exports.allPosts = (req, res) => {
    res.render("posts", {  title: "View All Savages" });
}

exports.uploadFile = (req, res) => {
    render("upload", { title: "Upload Files" });
}