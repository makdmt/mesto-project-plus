import { Joi } from "celebrate";

// interface IValidation {
//   schemaJoi: Joi.Schema,
//   errMessage: string
// }

// interface ILongedString extends IValidation {
//   required: boolean,
//   minLength: number,
//   maxLength: number
// }

class Validation {
  constructor(
    public errMessage: string,
    public schemaJoi: Joi.Schema
    ) {}
}

class LongedStringValidation extends Validation {
  public required: true;
  constructor(
    public minLength: number,
    public maxLength: number,
    public errMessage: string) {
    super(errMessage, Joi.string().required().min(minLength).max(maxLength));
    this.required = true;
  }
}

export const userNameValidation = new LongedStringValidation(
  2,
  30,
  'field "name" is required and must be string from 2 to 30 long'
);


export const userAboutValidation = new LongedStringValidation (
  2,
  200,
  'field "about" is required and must be string from 2 to 200 long'
)

export const userAvatarValidation = new Validation (
  'field "avatar" is required and must be URL',
  Joi.string().required().uri()
)

export const userValidator = Joi.object({
  name: userNameValidation.schemaJoi,
  about: userAboutValidation.schemaJoi,
  avatar: userAvatarValidation.schemaJoi
})
