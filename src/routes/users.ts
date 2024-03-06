import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  patchUserAvatar,
  patchUser,
  login,
  getLoginedUser,
} from '../controllers/users';
import auth from '../middlewares/auth';

const userRouter = Router();
userRouter.post('/signup', createUser);
userRouter.post('/signin', login);
userRouter.use(auth);
userRouter.patch('/me/avatar', patchUserAvatar);
userRouter.patch('/me', patchUser);
userRouter.get('/me', getLoginedUser);
userRouter.get('/:id', getUserById);
userRouter.get('/', getUsers);

export default userRouter;
