const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');
const uploadMiddleWare = require('../middlewares/uploadImage');

router.get('/', postsController.allPosts);
router.route('/upload')
    .get(postsController.renderPage)
    .post(uploadMiddleWare, postsController.uploadFile);
    
router.get('/user', (req, res, next) => { req.user = { id: '5f2416e0162a8029eba437c1'}; next(); }, postsController.addUsers);

module.exports = router;
