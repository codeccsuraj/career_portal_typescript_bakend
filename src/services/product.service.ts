import { IProduct } from "../interfaces/product.interface";
import ProductModel from "../models/product.model";

class ProductService {
    async createJobApplication (data : IProduct): Promise<IProduct> {
        try {
            const response = await ProductModel.create(data);
            return response 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const productServices = new ProductService();