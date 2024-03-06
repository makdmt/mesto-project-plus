import { NextFunction, Request, Response } from 'express';
import Cards from '../models/card';
import { STATUS_CODES } from '../middlewares/errors/status-codes';
import { ForbiddenError, NotFoundError } from '../middlewares/errors/custom-errors';

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
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  return Cards.findById({ _id: cardId }).orFail(new NotFoundError())
    .then((card) => {
      if (String(card.owner) !== userId) return Promise.reject(new ForbiddenError());
      return card.deleteOne()
        .then(() => res.send(STATUS_CODES.OK.message));
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  return Cards.findByIdAndUpdate({ _id: cardId }, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => res.send(card))
    .catch(next);
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  return Cards.findByIdAndUpdate(
    { _id: cardId },
    { $pull: { likes: userId } },
    { new: true },
  ).orFail(new NotFoundError())
    .then((card) => res.send(card))
    .catch(next);
};
