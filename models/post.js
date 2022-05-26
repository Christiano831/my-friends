const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId }
})

const postsCommentsSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId },
  text: {
    type: String,
    required: true
  }
})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
    blog: String,
    likes: [likesSchema],
    comments: [postsCommentsSchema],
  })
 

module.exports = mongoose.model('Post', postSchema);