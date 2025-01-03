const mongoose = require('mongoose');
const UserModel = require('../models/user.model');

const DoctorSchema = new mongoose.Schema({
  speciality: { type: String, required: true },
  affiliation: { type: String, required: true },
},
{ timestamps: true }
);

const Doctor = UserModel.discriminator('Doctor', DoctorSchema);

module.exports = Doctor;
