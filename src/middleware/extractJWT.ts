// check if token is valid

import { Request, Response, NextFunction } from 'express';
import logging from 'logging';
import jwt from 'jsonwebtoken';

const NAME = 'extractJWT';


const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  //logging.info(NAME, 'extractJWT');

  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET!, (error, decoded) => {
      if (error) {
        //logging.error(NAME, 'extractJWT', error);
        return res.status(404).json({
          message: error.message,
          error: error
        });
      } else {
        res.locals.jwt = decoded; // save variables and pass them along
        next()
      }
    }) 
  } else {
    return res.status(401).json({
      message: 'No token provided.',
      error: null
    });
  }

}

export default extractJWT;



