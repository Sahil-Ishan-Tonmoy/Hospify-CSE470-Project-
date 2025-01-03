const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  mail: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['Patient', 'Doctor', 'Staff'], // Allowed roles
  },
},
{
    timestamps: true,
}
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
