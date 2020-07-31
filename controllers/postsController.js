const { render } = require("../app");
const Post = require('../models/post');
const User = require('../models/user');

exports.allPosts = (req, res) => {
    res.render("posts", {  title: "View All Savages" });
}

exports.uploadFile = async (req, res) => {
    let { text } = req.body;
    try {
        console.log('>>>', req.user)
        let post = new Post({
            user_ref_id: req.user._id,
            image_url: req.imageUrl,
        })
    
        let user = await User.findById(req.user._id);
        console.log(user);
    
        post.save()
            .then(result => {
                user.points += 1;
                return user.save();
            })
            .then(result => {
                res.redirect('/posts/all');
            })
            .catch(error => {
                console.log(error);
                res.render('uploads', { error })
            });
    } catch(error) {
        console.log(error)
        res.render('uploads', { error });
    }
}

exports.renderPage = (req, res) => {
    res.render('upload')
}

exports.addUsers = (req, res) => {
    User.insertMany([
        {
            local: {
                first_name: 'Judge',
                last_name: 'Godwins',
                user_name: 'judgey',
                email: 'judgegodwins@gmail.com',
                is_active: true,
                password: 'test',
                country: 'Nigeria'
            }
        }
    ])
    .then(result => {
        res.json(result);
    })
}