import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
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
import { userAboutValidation, userAvatarValidation, userNameValidation, userValidator } from '../validators/user';
import { mongoObjIdValidation } from '../validators/shared-validators';

const userRouter = Router();
userRouter.post('/signup', celebrate({ body: userValidator }), createUser);
userRouter.post('/signin', celebrate({ body: userValidator }), login);
userRouter.use(auth);
userRouter.patch('/me/avatar', celebrate({ body: Joi.object().keys({ avatar: userAvatarValidation.schemaJoi }) }), patchUserAvatar);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: userNameValidation.schemaJoi,
    about: userAboutValidation.schemaJoi,
  }),
}), patchUser);
userRouter.get('/me', getLoginedUser);
userRouter.get('/:id', celebrate({ params: Joi.object().keys({ id: mongoObjIdValidation.schemaJoi }) }), getUserById);
userRouter.get('/', getUsers);

export default userRouter;
