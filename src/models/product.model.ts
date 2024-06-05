import mongoose, { Model, Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const IST_OFFSET_IN_MILLIS = 330 * 60 * 1000;
const productSchema: Schema<IProduct> = new mongoose.Schema({
    adminId: { type: String, required: true },
    email: { type: String, required: false, index : true },
    title: { type: String, required: true },
    basicTitle: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: [{ type: String, required: true }],
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String, required: true }],
    ratingCount: { type: Number, required: false },
    ratingSum: { type: Number, required: false },
    ratingCategories: {
        quality: { type: Number, required: false },
        value: { type: Number, required: false },
        delivery: { type: Number, required: false },
        customerService: { type: Number, required: false }
    },
    jobType: { type: String, required: true },
    workType: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    salaryRange: { type: String, required: true },
    profilePicture: { type: String, required: false },
    companyName: { type: String, required: false },
    companyWebsite: { type: String, required: false },
    jobUrl: { type: String, required: false },
    isReferenceJob: { type: Boolean, required: false, default: false },
    jobLocation: { type: String, required: false },
    openings: { type: Number, required: false },
    createdAt: { type: Date, default: new Date(Date.now() + IST_OFFSET_IN_MILLIS)},
    updatedAt: { type: Date, default: new Date(Date.now() + IST_OFFSET_IN_MILLIS)},
    emailVerified: { type: Boolean, required: false, default: false },
    deviceType: { type: String, required: false, default: null },
    browserName: { type: String, required: false, default: null }
});

const ProductModel: Model<IProduct> = mongoose.model<IProduct>('products', productSchema);
export default ProductModel;