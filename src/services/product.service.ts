import { Types } from "mongoose";
import { IProduct, IQueryParams } from "../interfaces/product.interface";
import ProductModel from "../models/product.model";
import { buildQuery } from "../utils/products.utils";

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

    async getAllApplications(): Promise<IProduct[]> {
        try {
            const response = await ProductModel.find({});
            return response as IProduct[]; // Assuming response is an array of products
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Re-throw the error to handle it in the calling function
        }
    }

    async getJobApplicationsById(adminId: string): Promise<IProduct[]> {
        try {
            const response = await ProductModel.find({ adminId });
            return response as IProduct[]; // Assuming response is an array of products
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Re-throw the error to handle it in the calling function
        }
    }

    async useSearchApplicationQuery(queryParams : IQueryParams): Promise<IProduct[]> {
        try {
            const query = buildQuery(queryParams);
            const response = await ProductModel.find(query).exec();
            return response;
        } catch (error) {
            console.error('Error in useSearchApplicationQuery:', error);
            throw new Error('Error retrieving products');
        }
    }
}

export const productServices = new ProductService();