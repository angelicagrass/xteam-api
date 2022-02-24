import express from 'express';
import controller from '../controllers/user';
import childController from '../controllers/child';
import extractJWT from '../middleware/extractJWT';

export const router = express.Router();

router.get('/validate',extractJWT, controller.validateToken);
router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/get/all', controller.getAllUsers);
router.post('/child', childController.newChild);

