import { Router } from "express";
import { getUsers, getUserById, createUser, patchUserAvatar, patchUser } from "../controllers/users";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me/avatar', patchUserAvatar);
userRouter.patch('/me', patchUser);

export default userRouter;
