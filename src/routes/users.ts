import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  patchUserAvatar,
  patchUser,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/:id', getUserById);
userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.patch('/me/avatar', patchUserAvatar);
userRouter.patch('/me', patchUser);

export default userRouter;
