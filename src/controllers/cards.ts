import { NextFunction, Request, Response } from 'express';
import Cards from '../models/card';
import { ForbiddenError, NotFoundError } from '../middlewares/errors/custom-errors';

const CARD_DELETED_MSG = 'card was successfully deleted';

export default (req: Request, res: Response, next: NextFunction) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => card.populate(['owner']).then((populatedCard) => res.send(populatedCard)))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;
  return Cards.findById(cardId).orFail(new NotFoundError())
    .then((card) => {
      if (String(card.owner) !== userId) return Promise.reject(new ForbiddenError());
      return card.deleteOne()
        .then(() => res.send({ message: CARD_DELETED_MSG }));
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;
  return Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => res.send(card))
    .catch(next);
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;
  return Cards.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  ).orFail(new NotFoundError())
    .then((card) => res.send(card))
    .catch(next);
};
