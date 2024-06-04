import express from 'express';
import { authController } from '../controller/auth.controller';

export const authRoutes = express.Router();

authRoutes.post('/create-user', authController.addUser);
authRoutes.post('/login-user', authController.authenticateUser);
authRoutes.post('/forgot-password', authController.forgotPassword);
authRoutes.post('/reset-password', authController.resetPassword);