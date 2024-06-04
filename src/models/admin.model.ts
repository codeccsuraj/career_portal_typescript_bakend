import mongoose, { Model, Schema } from "mongoose";
import { IAdminModel } from "../interfaces/admin.interface";

const IST_OFFSET_IN_MILLIS = 330 * 60 * 1000;
const adminSchema: Schema<IAdminModel> = new mongoose.Schema({
    sellerId: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode : { type: String, required: true },
    startedAt: { type: Date, required: true },
    description: { type: String },
    GST: { type: String },
    companyPan: { type: String },
    companyEmail: { type: String, lowercase: true, trim: true },
    companyContact: { type: String, required: true },
    companyWebsite: { type: String, required: true },
    numberOfEmployee: { type: String },
    service: [{ type: String }],
    browserName: { type: String },
    deviceType: { type: String },
    emailVerified: { type: Boolean },
    emailVerificationToken: { type: String },
    otp: { type: String },
    otpExpiration: { type: Date },
    createdAt: { type: Date, default: new Date(Date.now() + IST_OFFSET_IN_MILLIS)},
    updatedAt: { type: Date, default: new Date(Date.now() + IST_OFFSET_IN_MILLIS)},
});

const AdminModel: Model<IAdminModel> = mongoose.model<IAdminModel>('admin_details', adminSchema);
export default AdminModel;