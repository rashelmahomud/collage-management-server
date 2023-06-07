import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    res.json(200).json({
      success: true,
      message: 'database created successfully',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      massage: 'faild to database..',
    })
  }
}

export default {
  createUser,
}
