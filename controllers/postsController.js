const { render } = require("../app");
const Post = require('../models/post');
const User = require('../models/user');

exports.allPosts = (req, res) => {


    Post.find({})
        .then(posts => {
            console.log(posts);
            let sortedPosts;
            if(posts) {
                sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
            res.render('index', {posts: sortedPosts || posts, user: req.session.user});
        })
}

exports.uploadFile = async (req, res) => {
    
    try {
        let post = new Post({
            user_ref_id: req.session.user._id,
            image_url: req.imageUrl,
            username: req.session.user.user_name
        })

        // console.log('id >>>', req.session.user._id)
        let user = await User.findById(req.session.user._id);
        // console.log('user>>>', user);
    
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

// dev route
// exports.addUsers = (req, res) => {
//     console.log('>>id ', req.session.user);
//     Post.remove({})
//     .then(result => {
//         res.json(result);
//     })
// }