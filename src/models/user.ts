import mongoose from "mongoose";
import { userAboutValidation, userAvatarValidation, userNameValidation } from "../validators/user";


interface IUser {
  name: string,
  about: string,
  avatar: string
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [userNameValidation.required, userNameValidation.errMessage],
    minlength: userNameValidation.minLength,
    maxlength: userNameValidation.maxLength,
  },
  about: {
    type: String,
    required: [userAboutValidation.required, userAboutValidation.errMessage],
    minlength: userAboutValidation.minLength,
    maxlength: userAboutValidation.maxLength,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: userAvatarValidation.validator,
      message: userAvatarValidation.errMessage,
    },
  },
}, { versionKey: false });

export default mongoose.model<IUser>('user', userSchema);