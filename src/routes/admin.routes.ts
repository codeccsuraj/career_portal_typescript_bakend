import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { adminController } from '../controller/admin.controller';
import { checkUserPrivileges } from '../middleware/admin.middleware';
import { Roles } from '../enums/auth.enum';

export const adminRoutes = express.Router();

adminRoutes.post('/create-profile', authenticateToken,checkUserPrivileges([Roles.ADMIN]), adminController.createAdminModel)

