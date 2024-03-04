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

export class LongedStringValidation extends Validation {
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

export const userNameValidation = new LongedStringValidation(
  2,
  30,
  'name is required and must be string from 2 to 30 long',
);

export const userAboutValidation = new LongedStringValidation(
  2,
  200,
  'about is required and must be string from 2 to 200 long'
);

export const userAvatarValidation = new Validation(
  'avatar is required and must be URL',
  Joi.string().required().uri(),
);

export const userValidator = Joi.object({
  name: userNameValidation.schemaJoi,
  about: userAboutValidation.schemaJoi,
  avatar: userAvatarValidation.schemaJoi,
});
