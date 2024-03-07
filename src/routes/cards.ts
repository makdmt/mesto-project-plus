import { Router } from 'express';
import { mongoObjIdInQueryValidator } from '../validators/shared-validators';
import getCards, {
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', mongoObjIdInQueryValidator, deleteCard);
cardsRouter.put('/:id/likes', mongoObjIdInQueryValidator, likeCard);
cardsRouter.delete('/:id/likes', mongoObjIdInQueryValidator, dislikeCard);

export default cardsRouter;
