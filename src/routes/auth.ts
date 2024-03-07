import { Router } from 'express';
import { celebrate } from 'celebrate';
import { userValidator } from '../validators/user';
import { createUser, login } from '../controllers/users';

const authRouter = Router();

authRouter.post('/signup', celebrate({ body: userValidator }), createUser);
authRouter.post('/signin', celebrate({ body: userValidator }), login);

export default authRouter;
