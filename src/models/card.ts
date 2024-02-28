import mongoose, { ObjectId } from "mongoose";
import { celebrate, Joi } from "celebrate";

interface ICard {
  name: string,
  link: string,
  owner: ObjectId,
  likes: ObjectId[],
  createdAt: Date
}

const nameValidator = Joi.string().required().min(2).max(30);
console.log(Joi.isError(nameValidator.validate('sdd').error));
// console.log(nameValidator.validate(undefined).error);

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model<ICard>('card', cardSchema);