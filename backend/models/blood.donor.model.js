const mongoose=require('mongoose');

const BloodDonorSchema = mongoose.Schema(
    {  
        name: {
            type: String,
            required: [true,"Please enter your name"]
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        blood_type: {
            type: String,
            required: [true,"Please enter your blood group"]
        },
        contact_info: {
            type: String,
            required: [true,"Please enter your information"]
        },
    },
    {
        timestamps: true,
    }
);
const BloodDonor= mongoose.model('BloodDonor', BloodDonorSchema);

module.exports = BloodDonor;