import { Joi } from 'celebrate';
import { Validation, LongedStringValidation } from './user';

export const cardNameValidation = new LongedStringValidation(
  2,
  30,
  'name is required and must be string from 2 to 30 long',
);

export const cardLinkValidation = new Validation(
  'link is required and must be URL',
  Joi.string().required().uri(),
);
