const mongoose=require('mongoose');

const PostSchema = mongoose.Schema(
    {  
        postId: {
            type: Number,
            required: [true,"Please enter the ID"]
        },
        posted_by: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Post= mongoose.model('Post', PostSchema);

module.exports = Post;