import mongoose from 'mongoose';
import {
  userAboutValidation,
  userAvatarValidation,
  userEmailValidation,
  userNameValidation,
} from '../validators/user';

export interface IUser {
  email: string,
  password: string,
  name: string,
  about: string,
  avatar: string
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: userEmailValidation.validator,
      message: userEmailValidation.errMessage,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: userNameValidation.minLength,
    maxlength: userNameValidation.maxLength,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: userAboutValidation.minLength,
    maxlength: userAboutValidation.maxLength,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: userAvatarValidation.validator,
      message: userAvatarValidation.errMessage,
    },
  },
}, { versionKey: false });

export default mongoose.model<IUser>('user', userSchema);
