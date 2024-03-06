import { Request, Response, Router } from 'express';
import userRouter from './users';
import cardsRouter from './cards';
import { STATUS_CODES } from '../middlewares/errors/status-codes';
import auth from '../middlewares/auth';

const router = Router();
router.use('/users', userRouter);
router.use(auth);
router.use('/cards', cardsRouter);
router.use('*', (req: Request, res: Response) => {
  res.status(STATUS_CODES.NOT_FOUND.statusCode).send({ message: STATUS_CODES.NOT_FOUND.message });
});

export default router;
