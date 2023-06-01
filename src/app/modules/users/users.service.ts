import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { genaratedUserId } from './users.ulites'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto incremental genarated id

  const id = await genaratedUserId()
  user.id = id

  /// default passworld

  if (!user.password) {
    user.password = config.default_user_Pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Faild To dababase..')
  }
  return createdUser
}

export default {
  createUser,
}
