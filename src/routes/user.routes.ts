import express from 'express';
import { userController } from '../controller/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { checkUserPrivileges } from '../middleware/admin.middleware';
import { Roles } from '../enums/auth.enum';

export const userRoutes = express.Router();

userRoutes.post('/create-user',authenticateToken, checkUserPrivileges([Roles.USER]), userController.createUserDetails);
