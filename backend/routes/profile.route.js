const express =require ('express')
const{update_user, get_user, get_all_users}= require('../controllers/user.controller')
const router = express.Router()



router.get('/:role/:id', get_user);


router.patch('/:role/:id', update_user)

module.exports = router