import { Types } from "mongoose";

export interface IAdminModel {
        _id?: Types.ObjectId | string;
        adminId : string;
        email: string;
        companyName : string;
        companyAddress : string;
        city : string;
        state : string;
        country : string;
        pincode : string;
        startedAt : Date;
        description : string;
        GST : string;
        companyPan : string;
        companyEmail : string;
        companyContact : string;
        companyWebsite : string;
        numberOfEmployee : string;
        service : string[];
        browserName?: string;
        deviceType?: string;
        emailVerified?: boolean;
        emailVerificationToken?: string;
        otp?: string;
        otpExpiration?: Date;
        createdAt?: Date;
        updatedAt?: Date;
}

