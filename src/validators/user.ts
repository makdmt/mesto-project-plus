import { Joi } from 'celebrate';
import { Validation, LongedStringValidation, RequiredLongedStringValidation } from './shared-validators';

export const userEmailValidation = new Validation(
  'email is required',
  Joi.string().required().email(),
);

export const userPasswordValidation = new RequiredLongedStringValidation(
  0,
  100,
  'password is required and must be string from 0 to 100 long',
);

export const userNameValidation = new LongedStringValidation(
  2,
  30,
  'name must be string from 2 to 30 long',
);

export const userAboutValidation = new LongedStringValidation(
  2,
  200,
  'about must be string from 2 to 200 long',
);

export const userAvatarValidation = new Validation(
  'avatar must be URL',
  Joi.string().uri({ domain: {} }),
);

export const userValidator = Joi.object().keys({
  email: userEmailValidation.schemaJoi,
  password: userPasswordValidation.schemaJoi,
  name: userNameValidation.schemaJoi,
  about: userAboutValidation.schemaJoi,
  avatar: userAvatarValidation.schemaJoi,
});
