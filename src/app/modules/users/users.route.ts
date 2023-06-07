import express from 'express'
import userController from '../../../app/modules/users/users.controller'

const router = express.Router()

router.post('/create-user', userController.createUser)

export default router
