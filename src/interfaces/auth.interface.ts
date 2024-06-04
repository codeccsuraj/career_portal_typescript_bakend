import { Types } from "mongoose";
import { Roles } from "../enums/auth.enum";

export interface IAuthUser {
    id : string;
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    mobile : string;
    country : string;
    role? : Roles;
    profilePicture? : string;
    isEmailVerified : boolean;
    isMobileOtpVerified : boolean;
    browserType : string;
    emailResendOtp : boolean;
    mobileResendOtp : boolean;
    otp? :string | null;
    otpExpiration? : Date | null;
    createdAt? : Date;
    updatedAt? : Date;
};

export interface ILoginUser {
    email? : string;
    password : string;
}

export interface ILoginResponse {
    message : string;
    loading : boolean;
    token : string;
    user? : IAuthUser | null;
}
export interface IJwtPayload {
    id: string;
    email: string;
}