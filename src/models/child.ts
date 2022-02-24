import mongoose, { Schema } from 'mongoose'
import ChildInterface from '../interfaces/child'

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  birthday: { type: Number, required: true }
}, {
  timestamps: true
})

export default mongoose.model<ChildInterface>('Child', UserSchema)