const mongoose = require('mongoose');
const UserModel = require('../models/user.model');


const StaffSchema = new mongoose.Schema(
  {
    position: { type: String, required: false }, 
  },
  { timestamps: true }
);


const Staff = UserModel.discriminator('Staff', StaffSchema);

module.exports = Staff;
