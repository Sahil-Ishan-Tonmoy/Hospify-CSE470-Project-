const mongoose=require('mongoose');

const MedicalHistorySchema = mongoose.Schema(
    {  
        patient_name: {
            type: String,
            required: true,
        },
        allergy: {
            type: Boolean,
            required: true,
        },
        diabetes: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const MedicalHistory= mongoose.model('MedicalHistory', MedicalHistorySchema);

module.exports = MedicalHistory;