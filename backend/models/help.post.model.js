const mongoose=require('mongoose');

const HelpPostSchema = mongoose.Schema(
    {  
        title: {
            type: Number,
            required: [true,"Please enter the ID"]
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const HelpPost= Post.discriminator('HelpPost', HelpPostSchema);

module.exports = HelpPost;