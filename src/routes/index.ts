import {
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import authRouter from './auth';
import userRouter from './users';
import cardsRouter from './cards';
import auth from '../middlewares/auth';
import { NotFoundError } from '../middlewares/errors/custom-errors';

const router = Router();
router.use('/', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('*', (req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

export default router;
