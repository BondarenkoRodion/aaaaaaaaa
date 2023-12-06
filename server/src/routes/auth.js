import express from 'express'
import { signup, login, logout, loginBeforeCreatedComponent } from '../controllers/auth.js'
import { authentication } from '../middlewares/authentication.js'


const router = express.Router()


router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', authentication, logout)
router.post('/login_before_created', loginBeforeCreatedComponent)


export default router
