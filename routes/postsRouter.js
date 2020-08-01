const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');
const uploadMiddleWare = require('../middlewares/uploadImage');
const auth = require('../middlewares/auth');


router.get('/', postsController.allPosts);
router.route('/upload')
    .get(auth, postsController.renderPage)
    .post(uploadMiddleWare, postsController.uploadFile);
    
// router.get('/user', (req, res, next) => { req.user = { _id: '5f24643f37108112ee6334eb'}; next(); }, postsController.addUsers);

module.exports = router;
