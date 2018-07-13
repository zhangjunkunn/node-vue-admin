import express from 'express'
import * as User from '../controller/user'

const router = express.Router()

router.post('/user/login', User.login)
router.get('/user/info', User.info)

export default router