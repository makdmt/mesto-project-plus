import { Joi } from 'celebrate';

export class Validation {
  public validator: (val: string | number) => boolean;

  constructor(
    public errMessage: string,
    public schemaJoi: Joi.Schema,
  ) {
    this.validator = (val) => !Joi.isError(schemaJoi.validate(val).error);
  }
}

export class RequiredLongedStringValidation extends Validation {
  public required: true;

  constructor(
    public minLength: number,
    public maxLength: number,
    public errMessage: string,
  ) {
    super(errMessage, Joi.string().required().min(minLength).max(maxLength));
    this.required = true;
  }
}

export class LongedStringValidation extends Validation {
  constructor(
    public minLength: number,
    public maxLength: number,
    public errMessage: string,
  ) {
    super(errMessage, Joi.string().min(minLength).max(maxLength));
  }
}

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
  Joi.string().uri(),
);

export const userValidator = Joi.object({
  name: userNameValidation.schemaJoi,
  about: userAboutValidation.schemaJoi,
  avatar: userAvatarValidation.schemaJoi,
});
