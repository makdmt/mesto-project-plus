import { Joi, celebrate } from 'celebrate';

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
  constructor(
    public minLength: number,
    public maxLength: number,
    public errMessage: string,
    public required: true = true,
  ) {
    super(errMessage, Joi.string().required().min(minLength).max(maxLength));
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

const mongoObjIdValidation = new Validation(
  '_id is required and must be string 20 long',
  Joi.string().required().alphanum().length(24),
);

export const mongoObjIdInQueryValidator = celebrate({
  params: Joi.object().keys({ id: mongoObjIdValidation.schemaJoi }),
});
