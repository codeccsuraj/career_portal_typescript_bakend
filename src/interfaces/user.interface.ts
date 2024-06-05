import { Types } from "mongoose";

export interface IUserModel {
    _id?: Types.ObjectId | string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    gender: string;
    dateOfBirth: Date;
    bio: string;
    experience: number;
    alternateNumber?: number;
    profilePicture?: string;
    resumeUrl: string;
    createdAt: Date;
    updatedAt: Date;
    address?: Address;
    experiences?: Experience[];
    education? : Education[];
    links?: Links;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isPermanent: boolean;
}

export interface Experience {
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    isActive: boolean;
}

export interface Education {
    title: string;
    university: string;
    startDate: Date;
    endDate?: Date;
    marks: string;
    isActive: boolean;
}

export interface Links {
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
}
