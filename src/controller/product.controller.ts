import { Request, Response } from "express";
import { IProduct } from "../interfaces/product.interface";
import { productSchemaValidate } from "../schemas/product.schema";
import { productServices } from "../services/product.service";

class ProductController {
    async createJobApplication(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const { error } = productSchemaValidate.validate(data);
            if (error) {
                res.status(400).json({ message: "error" });
                return;
            }

            const response = await productServices.createJobApplication(data);
            res.status(200).json({ data: response });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export const productController = new ProductController();
