const { render } = require("../app");
const Post = require('../models/post');
const User = require('../models/user');

exports.allPosts = (req, res) => {


    Post.find({})
        .then(posts => {
            console.log(posts[0].createdAt);
            let sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            res.render('index', {posts: sortedPosts});
        })
}

exports.uploadFile = async (req, res) => {
    
    try {
        console.log('>>>', req.user)
        let post = new Post({
            user_ref_id: req.user._id,
            image_url: req.imageUrl,
            username: req.user.user_name
        })
    
        let user = await User.findById(req.user._id);
        console.log('user>>>', user);
    
        post.save()
            .then(result => {
                user.points += 1;
                return user.save();
            })
            .then(result => {
                res.redirect('/posts');
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

//dev route
// exports.addUsers = (req, res) => {
//     Post.remove({})
//     .then(result => {
//         res.json(result);
//     })
// }