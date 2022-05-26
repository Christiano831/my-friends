const Post = require('../models/post');

module.exports = {
    create,
    // delete: deleteComment,
    // edit,
    // update: updateComment
}

// function create(req, res) {
//     Post.findById(req.params.id, function(err, post) {
//         req.body.user = req.user._id;
//         req.body.userName = req.user.name;
//         post.comments.push(req.body);
//         post.save(function(err) {
//             res.redirect(`/posts/${post._id}`);
//         });
//     });
// }
async function create(req, res){
    try {
        const post = await Post.findById(req.params.id);
		
        post.comments.push({username: req.user.username, userId: req.user._id});
        await post.save()
        res.status(201).json({data: 'comment added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

// function deleteComment(req, res){
//     Post.findOne(
//         {'comments._id': req.params.id, 'comments.userId': req.user._id},
//         function(err, post) {
//           if (!post || err) return res.redirect(`/posts/${post._id}`);
//           post.comments.remove(req.params.id);
//           post.save(function(err) {
//             res.redirect(`/posts/${post._id}`);
//           });
//         }
//       );
// }

// function edit(req, res) {
//   Post.findOne({'comments._id': req.params.id}, function(err, post) {
//     const comment = post.comments.id(req.params.id);
//     res.render('comments/edit', {comment});
//   });
// }

// function updateComment(req, res) {
//   Post.findOne({'comments._id': req.params.id}, function(err, post) {
//     const commentSubdoc = post.comments.id(req.params.id);
//     commentSubdoc.text = req.body.text;
//     post.save(function(err) {
//       res.redirect(`/posts/${post._id}`);
//     });
//   });
// }