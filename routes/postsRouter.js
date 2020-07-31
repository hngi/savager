const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');

router.get('/', postsController.allPosts);
router.get('/upload', postsController.uploadFile)

module.exports = router; 
