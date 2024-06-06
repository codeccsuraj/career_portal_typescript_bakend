import { Types } from "mongoose";

export interface IProduct {
    _id?: Types.ObjectId | string;
    id?: string;
    adminId?: string;
    email? : string;
    title: string;
    basicTitle: string;
    category: string
    subCategory : string[];
    shortDescription: string;
    description: string;
    tags: string[];
    ratingCount: number;
    ratingSum: number;
    ratingCategories?: IRatingCategories;
    profilePicture?: string;
    jobType : string;
    workType : string;
    salaryRange : string;
    experience : string;
    qualification : string;
    openings : number;
    companyName? : string;
    companyWebsite? : string;
    jobUrl? : string;
    jobLocation? : string;
    isReferenceJob? : boolean
    createdAt: Date;
    updatedAt?: Date
    emailVerified?: boolean;
    deviceType? : string;
    browserName? : string,
    toJSON?: () => unknown;
}
export interface IRatingCategoryItem {
    value: number;
    count: number;
}

export interface IRatingCategories {
    five: IRatingCategoryItem;
    four: IRatingCategoryItem;
    three: IRatingCategoryItem;
    two: IRatingCategoryItem;
    one: IRatingCategoryItem;
}
export interface IQueryParams {
    id?: string;
    category?: string;
    subcategory?: string;
    jobType : string;
    inStock?: boolean;
    workType : string;
    salaryRange : string;
    experience : string;
    qualification : string;
    jobLocation? : string;
    [key: string]: any;
}