import Cards from '../models/cards'
import { Request, Response } from "express";
import { STATUS_CODES } from '../helpers/constants'


export const getCards = (req: Request, res: Response) => {
  return Cards.find({})
    .then(cards => res.status(STATUS_CODES.OK.statusCode).send(cards))
    .catch(err => res.status(STATUS_CODES.NOT_FOUND.statusCode).send(STATUS_CODES.NOT_FOUND.message))
}