PORT=4001
const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser")

//express app
const app = express()
const mongoose = require('mongoose')
const loginRoutes = require('./routes/login.route')
const signupRoutes = require('./routes/signup.route')
const profileRoutes = require('./routes/profile.route')
const forgetpassRoutes= require('./routes/forgetpass.route')

//middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/login',loginRoutes)
app.use('/signup',signupRoutes)
app.use('/profile',profileRoutes)
app.use("/forgot-password", forgetpassRoutes)

//connect to db
const URI= 'mongodb+srv://hospify:hospify123@cluster0.urxgy.mongodb.net/Hospify?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(URI)
.then(()=>{
    console.log('Connected to DB')
})
.catch((error)=>{
    console.log(error)
})

//listen
app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`)

})

