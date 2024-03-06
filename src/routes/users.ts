import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  patchUserAvatar,
  patchUser,
  login,
} from '../controllers/users';
import auth from '../middlewares/auth';

const userRouter = Router();
userRouter.post('/signup', createUser);
userRouter.post('/signin', login);
userRouter.use(auth);
userRouter.get('/:id', getUserById);
userRouter.get('/', getUsers);
userRouter.patch('/me/avatar', patchUserAvatar);
userRouter.patch('/me', patchUser);

export default userRouter;
