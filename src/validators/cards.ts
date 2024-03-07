import { Joi } from 'celebrate';
import { Validation, RequiredLongedStringValidation, urlValidator } from './shared-validators';

export const cardNameValidation = new RequiredLongedStringValidation(
  2,
  30,
  'name is required and must be string from 2 to 30 long',
);

export const cardLinkValidation = new Validation(
  'link is required and must be URL',
  Joi.string().required().custom(urlValidator),
);

export const cardValidator = Joi.object().keys({
  name: cardNameValidation.schemaJoi,
  link: cardLinkValidation.schemaJoi,
});
