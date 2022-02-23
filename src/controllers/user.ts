import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging'
import bcryptjs from 'bcryptjs';

const NAME = 'user';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('hej hej hej')
  logging.info(NAME, 'validateToken');

  return res.status(200).json({
    message: 'validateToken'
  });

}

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      
      return res.status(500).json({
        message: hashError.message,
        error: hashError
      });
    }
  });
    
        
}

const loginUser = (req: Request, res: Response, next: NextFunction) => {
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
}

export default { validateToken, registerUser, loginUser, getAllUsers };