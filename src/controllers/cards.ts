import Cards from '../models/cards'
import { Request, Response } from "express";

export const getCards = (req: Request, res: Response) => {
  return Cards.find({})
  .then(cards => res.send)
}