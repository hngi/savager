const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');
const uploadMiddleWare = require('../middlewares/uploadImage');

router.get('/', postsController.allPosts);
router.get('/upload', uploadMiddleWare, postsController.uploadFile)

module.exports = router; 
