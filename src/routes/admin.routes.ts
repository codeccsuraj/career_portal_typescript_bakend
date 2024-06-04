import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { adminController } from '../controller/admin.controller';

export const adminRoutes = express.Router();

adminRoutes.post('/create-profile', authenticateToken, adminController.createAdminModel)

