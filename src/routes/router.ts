import express, { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
// import { router as v1Router } from './api/v1/router'
//import { router as authRouter } from './auth-router.js'




export const router = express.Router()
//router.use('/', authRouter)

// router.use('/api/v1', v1Router)

router.use('*', (req: Request, res: Response, next: NextFunction) => next(createError(404)))