import express from 'express';
import { productController } from '../controller/product.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { checkUserPrivileges } from '../middleware/admin.middleware';
import { Roles } from '../enums/auth.enum';
export const productRoutes = express.Router();

productRoutes.post('/add/job-application',authenticateToken, checkUserPrivileges([Roles.ADMIN]), productController.createJobApplication);