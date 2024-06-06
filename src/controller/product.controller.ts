import { Request, Response } from "express";
import { IProduct, IQueryParams } from "../interfaces/product.interface";
import { productSchemaValidate } from "../schemas/product.schema";
import { productServices } from "../services/product.service";

class ProductController {
    async createJobApplication(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const { error } = productSchemaValidate.validate(data);

            if (error) {
                res.status(400).json({ message: error.details[0].message });
                return;
            }

            const response = await productServices.createJobApplication(data);
            res.status(201).json({ data: response });
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    async getAllApplications(req: Request, res: Response): Promise<void>{
        try {
            const applications = await productServices.getAllApplications();
            res.status(200).json(applications);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch applications', error: error });
        }
    };

    async getJobApplicationsByIdController (req: Request, res: Response): Promise<void>{
        try {
            const adminId: string = req.params.adminId; 
            const products = await productServices.getJobApplicationsById(adminId);
    
            if (products.length === 0) {
                res.status(404).json({ success: false, message: 'No products found for the specified adminId' });
                return;
            }
    
            res.status(200).json({ success: true, data: products });
        } catch (error) {
            console.error('Error in getJobApplicationsByIdController:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };

    async searchProducts(req: Request, res: Response): Promise<void> {
        try {
            const queryParams: IQueryParams = req.query as IQueryParams;
            const products = await productServices.useSearchApplicationQuery(queryParams);
            res.json(products);
        } catch (error) {
            console.error('Error in searchProducts:', error);
            res.status(500).json({ error: 'Error retrieving products' });
        }
    }
}

export const productController = new ProductController();
