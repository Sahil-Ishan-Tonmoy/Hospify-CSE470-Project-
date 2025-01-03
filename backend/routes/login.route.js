const express =require ('express')
const{get_all_users, get_user, login_user}= require('../controllers/user.controller')
const router = express.Router()

router.get('/', get_all_users)

router.get('/:id', get_user)

router.post('/', login_user)



module.exports = router