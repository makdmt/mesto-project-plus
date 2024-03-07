import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import {
  getUsers,
  getUserById,
  patchUserAvatar,
  patchUser,
  getLoginedUser,
} from '../controllers/users';
import auth from '../middlewares/auth';
import {
  userAboutValidation,
  userAvatarValidation,
  userNameValidation,
} from '../validators/user';
import { mongoObjIdInQueryValidator } from '../validators/shared-validators';

const userRouter = Router();

userRouter.patch('/me/avatar', celebrate({ body: Joi.object().keys({ avatar: userAvatarValidation.schemaJoi }) }), patchUserAvatar);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: userNameValidation.schemaJoi,
    about: userAboutValidation.schemaJoi,
  }),
}), patchUser);
userRouter.get('/me', getLoginedUser);
userRouter.get('/:id', mongoObjIdInQueryValidator, getUserById);
userRouter.get('/', getUsers);

export default userRouter;
