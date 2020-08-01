const Users = require("../models/user");
const Posts = require("../models/post");

module.exports = async (req, res) => {
  try {
    if (req.session.user && req.session.user._id) {
      const userId = req.session.user._id;
      const user = await Users.findById(userId);
      if (!user) {
        return res.redirect("/users/signin");
      }
      const userPosts = await Posts.find({ user_ref_id: user._id });
      return res.render("userdashboard", {
        user: user.local.user_name,
        userId: user._id,
        postNo: userPosts.length,
        earned: userPosts.length * 1000,
        posts: userPosts.map((post) => ({
          imageUrl: post.image_url,
          tags: post.tags,
        })),
      });
    } else {
      return res.redirect("/users/signin");
    }
  } catch (err) {
    return res.render("error", { error: err });
  }
};
