import mongoose, { Schema } from 'mongoose'
import UserInterface from '../interfaces/user'

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
})

export default mongoose.model<UserInterface>('User', UserSchema)


