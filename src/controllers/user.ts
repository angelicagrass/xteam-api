import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging'
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/user';
import signJWT from '../functions/signJWT';

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
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: hash
  });
    return user.save()
    .then(user => {
      return res.status(201).json({
        user
      })
    })
    .catch((error => {
      return res.status(500).json({
        message: error.message,
        error: error
      })
    }))
  })
}

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
  User.find({ username })
  .exec()
  .then(users => {
    if (users.length !== 1)
    {
      return res.status(401).json({
        message: 'Wrong username or password',
      })
    }

    bcryptjs.compare(password, users[0].password, (compareError, result) => {
      if (compareError) {
        return res.status(401).json({
          message: 'Wrong username or password',
        })

      } else if (result) {
        signJWT(users[0], (_error, token) => {
          if (_error) {
              return res.status(500).json({
                  message: _error.message,
                  error: _error
              });
          } else if (token) {
              return res.status(200).json({
                  message: 'Auth successful',
                  token: token,
                  user: users[0]
              });
          }
      });
      }
    })
  })
  .catch(error => {
    return res.status(500).json({
      message: error.message,
      error: error
    })
  })
}



const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  //find all users
  

}

export default { validateToken, registerUser, loginUser, getAllUsers };