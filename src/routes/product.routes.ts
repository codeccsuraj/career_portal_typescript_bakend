import express from 'express';
import { productController } from '../controller/product.controller';
export const productRoutes = express.Router();

productRoutes.post('/add/job-application', productController.createJobApplication);