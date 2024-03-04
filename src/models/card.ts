import mongoose, { ObjectId } from 'mongoose';
import { cardLinkValidation, cardNameValidation } from '../validators/cards';

interface ICard {
  name: string,
  link: string,
  owner: ObjectId,
  likes: ObjectId[],
  createdAt: Date
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    validate: {
      validator: cardNameValidation.validator,
      message: cardNameValidation.errMessage,
    },
  },
  link: {
    type: String,
    validate: {
      validator: cardLinkValidation.validator,
      message: cardLinkValidation.errMessage,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

export default mongoose.model<ICard>('card', cardSchema);
