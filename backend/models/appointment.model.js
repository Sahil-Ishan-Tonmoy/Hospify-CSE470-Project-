const mongoose=require('mongoose');

const AppointmentSchema = mongoose.Schema(
    {  
        appointmentId: {
            type: Number,
            required: [true,"Please enter the ID"]
        },
        patient: {
            type: String,
            required: true,
        },
        doctor: {
            type: String,
            required: [true,"Enter your desired doctor's name"]
        },
        schedule: {
            type: Date,
            required: [true,"Enter time"]
        },
    },
    {
        timestamps: true,
    }
);
const Appointment= mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;