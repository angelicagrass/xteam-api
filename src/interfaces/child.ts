import { Document } from 'mongoose';

export default interface ChildInterface extends Document {
  name: string;
  birthday: number;
} 