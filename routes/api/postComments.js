const express = require('express');
const router = express.Router();
const postCommentsCtrl = require('../../controllers/postComments')

router.post('/posts/:id/postComments', postCommentsCtrl.create)
// router.delete('/postComments/:id', postCommentsCtrl.deleteLike)

module.exports = router;