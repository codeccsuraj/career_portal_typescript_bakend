import mongoose, { Model, Schema } from "mongoose";
import { IUserModel } from "../interfaces/user.interface";

const IST_OFFSET_IN_MILLIS = 330 * 60 * 1000;
const userSchema:Schema<IUserModel> = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    bio: { type: String, required: true },
    experience: { type: Number, required: true },
    alternateNumber: { type: Number },
    profilePicture: { type: String },
    resumeUrl: { type: String, required: true },
    createdAt: { type: Date, default: new Date(Date.now() + IST_OFFSET_IN_MILLIS)},
    updatedAt: { type: Date, default: new Date(Date.now() + IST_OFFSET_IN_MILLIS)},
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
        isPermanent : {type : Boolean, required : false}
    },
    experiences: [{
        title: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String, required: true },
        isActive : {type : Boolean, required : false}
    }],
    education: [{
        title: { type: String, required: true },
        university: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        marks: { type: String, required: true },
        isActive : {type : Boolean, required : false}
    }],
    links: {
        website: { type: String },
        linkedin: { type: String },
        github: { type: String },
        twitter: { type: String },
        portfolio: { type: String }
    }
});

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);
export default UserModel;