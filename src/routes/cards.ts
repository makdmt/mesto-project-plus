import { Router } from 'express';
import { mongoObjIdInQueryValidator } from '../validators/shared-validators';
import getCards, {
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.put('/:id/likes', mongoObjIdInQueryValidator, likeCard);
cardsRouter.delete('/:id/likes', mongoObjIdInQueryValidator, dislikeCard);
cardsRouter.delete('/:id', mongoObjIdInQueryValidator, deleteCard);
cardsRouter.post('/', createCard);
cardsRouter.get('/', getCards);

export default cardsRouter;
