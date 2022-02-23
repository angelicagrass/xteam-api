import express from 'express';
import controller from '../controllers/user';

export const router = express.Router();

router.get('/validate', controller.validateToken);
router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/get/all', controller.getAllUsers);

