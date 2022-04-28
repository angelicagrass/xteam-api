import { Document } from 'mongoose';
import ChildInterface from '../interfaces/child';



export default interface UserInterface extends Document {
  username: string;
  password: string;
  children: Array<any>;
} 