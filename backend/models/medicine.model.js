const mongoose=require('mongoose');

const MedicineSchema = mongoose.Schema(
    {  
        prescriptionId: {
            type: Number,
            required: [true,"Please enter the ID"]
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand_name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Medicine = mongoose.model('Medicine', MedicineSchema);

module.exports = Medicine;