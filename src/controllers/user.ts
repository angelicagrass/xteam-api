import { NextFunction, Request, Response } from 'express';

const NAME = 'user';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
}

const registerUser = (req: Request, res: Response, next: NextFunction) => {
}

const loginUser = (req: Request, res: Response, next: NextFunction) => {
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
}

export default { validateToken, registerUser, loginUser, getAllUsers };