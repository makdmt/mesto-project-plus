import { Joi } from "celebrate";

export const userNameValidation = {
  schema: Joi.string().required().min(2).max(30),
  message: 'Username must be string from 2 to 30 long'
}

// export default nameValidation



// const userSchema = new mongoose.Schema<IUser>({
//   name: {
//     type: String,
//     required: [true, 'name is required'],
//     minlength: 2,
//     maxlength: 30,
//   },
//   about: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 200,
//   },
//   avatar: {
//     type: String,
//     required: true,
//   }
// }, { versionKey: false })