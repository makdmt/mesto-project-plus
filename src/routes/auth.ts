import { Router } from 'express';
import { celebrate } from 'celebrate';
import { userValidator } from '../validators/user';
import { createUser, login, logout } from '../controllers/users';

const authRouter = Router();

authRouter.post('/signup', celebrate({ body: userValidator }), createUser);
authRouter.post('/signin', celebrate({ body: userValidator }), login);
authRouter.get('/signout', logout);

export default authRouter;
