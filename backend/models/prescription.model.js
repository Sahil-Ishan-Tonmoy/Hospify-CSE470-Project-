const mongoose=require('mongoose');

const PrescriptionSchema = mongoose.Schema(
    {  
        prescriptionId: {
            type: Number,
            required: [true,"Please enter the ID"]
        },
        assign_date: {
            type: date,
            required: true,
        },
        medicine_name: {
            type: String,
            required: true,
        },
        dosage: {
            type: String,
            required: true,
        },
        link_to_store: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Prescription= mongoose.model('Prescription', PrescriptionSchema);

module.exports = Prescription;