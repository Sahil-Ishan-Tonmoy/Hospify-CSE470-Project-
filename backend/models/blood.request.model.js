const mongoose=require('mongoose');

const BloodRequestSchema = mongoose.Schema(
    {  
        blood_type: {
            type: String,
            required: [true,"Please enter the type"]
        },
        units: {
            type: Number,
            required: true,
        },
        request_date: {
            type: Date,
            required: true,
        },
        emergency_contact: {
            type: Number,
            required: true,
        },
        

    },
    {
        timestamps: true,
    }
);

const BloodRequest= Post.discriminator('BloodRequest', BloodrequestSchema);

module.exports = BloodRequest;