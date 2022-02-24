import jwt from "jsonwebtoken";
import UserInterface from "../interfaces/user";
import logging from '../config/logging';

const NAME = 'Auth'

const signJWT = (user: UserInterface, callback: (error: Error | null, token: string | null) => void): void => {
  const startTime = new Date().getTime();
  const expirationTime = startTime + Number(process.env.TOKEN_EXPIRE_TIME) * 100000 // get time in milliseconds
  const timeInSeconds = Math.floor(expirationTime / 1000) // get time in seconds

  logging.info(NAME, `signJWT: ${user.username}`)

  try {
    const token = jwt.sign({
      username: user.username,
    }, 
    process.env.TOKEN_SECRET!,
    {
      issuer: process.env.TOKEN_ISSUER,
      algorithm: 'HS256',
      expiresIn: timeInSeconds
    },
    (error, token) => {
      if (error) { callback(error, null) }
      else if (token) { callback(null, token) }
    }
    
    )


  } catch (error) {
    //callback(error, null)
  }
}

export default signJWT