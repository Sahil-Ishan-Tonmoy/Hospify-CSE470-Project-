const UserModel = require('../models/user.model')
const PatientModel = require('../models/patient.model');
const DoctorModel = require('../models/doctor.model');
const StaffModel = require('../models/staff.model')
const mongoose = require('mongoose')


//get all users
const get_all_users= async (req, res)=>{
    const Users= await UserModel.find({}).sort({createdAt: -1})
    res.status(200).json(Users)
}

//get single user
const get_user= async (req, res)=>{
    console.log('get user invoked')
    const { id } = req.params
    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }

    const user= await UserModel.findById(id)
    if (!user){
        return  res.status(400).json({error: 'No such User'})
    }
    res.status(200).json(user)
}

//login User
// const login_user = async (req, res) => {
//     const loggedUser = req.body;
//     const matchedUser = await UserModel.findOne({
//         userId: loggedUser.userId,
//         password: loggedUser.password, // Use hashed password check if applicable
//     });
    
//     if (matchedUser) {
//         console.log("Matched");
//         return res.status(200).json({ message: "Matched", userId: matchedUser._id });
//     }
//     console.log("Not Matched");
//     res.status(401).json({ message: "Invalid credentials" });
// }    

const login_user = async (req, res) => {
    try {
        const loggedUser = req.body;

        const matchedUser = await UserModel.findOne({
            userId: loggedUser.userId,
            password: loggedUser.password, 
        });

        if (!matchedUser) {
            console.log("Not Matched");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log("Matched");

        return res.status(200).json({
            message: "Matched",
            userId: matchedUser._id,
            role: matchedUser.role,
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//create new user
// const create_new_user= async (req, res)=>{
//     const newUser= req.body
//     console.log(req.body)

//     try{
//         const user = await UserModel.create(newUser)
//         res.status(200).json(user)
//     }
//     catch(error){
//         res.status(400).json(error)
//     }
    
// }

const create_new_user= async (req, res) => {
    try {
        const { role, ...userData } = req.body;
        console.log(role)
        let user;
        if (role === 'Patient') {
        user = new PatientModel({ ...userData, role: 'Patient' });
        } else if (role === 'Doctor') {
        user = new DoctorModel({ ...userData, role: 'Doctor' });
        } else if (role === 'Staff') {
        user = new StaffModel({ ...userData, role: 'Staff' }); 
        }
         else {
            return res.status(400).json({ error: 'Invalid role' });
        }

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Delete a User
const delete_user= async (req, res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }

    const user= await UserModel.findOneAndDelete({_id: id})
    if (!user){
        return  res.status(400).json({error: 'No such User'})
    }
    res.status(200).json(user)
}

//Update a User
const update_user= async (req, res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }

    const user= await UserModel.findOneAndUpdate({_id: id}, {...req.body})
    if (!user){
        return  res.status(400).json({error: 'No such User'})
    }
    res.status(200).json(user)
}


module.exports={
    get_all_users,
    get_user,
    create_new_user,
    delete_user,
    update_user,
    login_user
}