import { User } from './user.model';

export const findUserLastId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const genaratedUserId = async () => {
  const curentId = (await findUserLastId()) || (0).toString().padStart(5, '0');

  const incrementedId = (parseInt(curentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};
