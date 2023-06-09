import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { genaratedUserId } from './user.ulites';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto incremental genarated id

  const id = await genaratedUserId();
  user.id = id;

  /// default passworld

  if (!user.password) {
    user.password = config.default_user_Pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Faild To dababase..');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
