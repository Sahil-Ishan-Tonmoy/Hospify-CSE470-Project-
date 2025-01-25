const mongoose = require('mongoose')
const UserModel = require('../models/user.model')
const PatientSchema = mongoose.Schema(
    {
        gender: {
            type: String,
            required: [true, "Please enter your gender"],
            enum: ['Male', 'Female', 'Other'],
        },
        age: {
            type: Number,
            required: [true, "Please enter your age"],
            min: 0,
        },
        height: {
            type: Number,
            required: [true, "Please enter your height"],
            min: 30, // Example minimum for valid height in cm
        },
        weight: {
            type: Number,
            required: [true, "Please enter your weight"],
            min: 2, // Example minimum for valid weight in kg
        },
        address: {
            type: String,
            required: [true, "Please enter your address"],
        },
    },
    { timestamps: true }
);

const Patient = UserModel.discriminator('Patient', PatientSchema);

module.exports = Patient;
