import Cards from '../models/card'
import { Request, Response } from "express";
import { STATUS_CODES } from '../helpers/constants'


export const getCards = (req: Request, res: Response) => {
  return Cards.find({})
    .then(cards => res.status(STATUS_CODES.OK.statusCode).send(cards))
    .catch(err => res.status(STATUS_CODES.NOT_FOUND.statusCode).send(STATUS_CODES.NOT_FOUND.message))
}

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  return Cards.create({ name, link, owner: req.user._id })
    .then(card => res.status(STATUS_CODES.OK.statusCode).send(card.populate('owner')))
    .catch(err => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode).send(STATUS_CODES.INTERNAL_SERVER_ERROR.message))
}

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  return Cards.findByIdAndDelete({ _id: cardId })
    .then(card => res.status(STATUS_CODES.OK.statusCode).send(STATUS_CODES.OK.message))
    .catch(err => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode).send(STATUS_CODES.INTERNAL_SERVER_ERROR.message))
}