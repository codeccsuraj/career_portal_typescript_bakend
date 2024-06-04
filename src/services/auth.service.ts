import { IAuthUser, ILoginResponse, ILoginUser } from "../interfaces/auth.interface";
import bcrypt from 'bcrypt';
import AuthUser from "../models/auth.model";
import jwt from 'jsonwebtoken';
import { generate } from "otp-generator";
import EmailVerificationProvider from "../config/email.config";

type AddUserResult = IAuthUser | string;

class AuthService {
    async addUser(userDetails: IAuthUser): Promise<AddUserResult | null> {
        try {
            const existingUserWithEmail = await AuthUser.findOne({
                where: { email: userDetails.email },
            });

            if (existingUserWithEmail) {
                return 'Email already exists';
            }

            const existingMobileUser = await AuthUser.findOne({ where: { mobile: userDetails.mobile } });
            if (existingMobileUser) {
                return 'Mobile number already exists';
            }

            const response = await AuthUser.create(userDetails);
            return response.toJSON() as IAuthUser;
        } catch (error) {
            console.error("Error adding user:", error);
            return null;
        }
    }

    async authenticateUser(loginCredentials: ILoginUser): Promise<ILoginResponse> {
        try {
            const { email, password } = loginCredentials;

            // Check if the user exists with the provided email
            const user = await AuthUser.findOne({ where: { email } });

            if (!user) {
                return { message: 'User not found', loading: false, token: '', user: user };
            }

            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return { message: 'Invalid password', loading: false, token: '', user: null };
            }

            // If email and password are valid, generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            return { message: 'Login successful', loading: false, token, user: user.toJSON() as IAuthUser };
        } catch (error) {
            console.error("Error authenticating user:", error);
            return { message: 'Internal server error', loading: false, token: '', user: null };
        }
    }

    async forgotPassword(email: string): Promise<string> {
        try {
            const user = await AuthUser.findOne({ where: { email } });

            if (!user) {
                return 'User not found';
            }

            // Generate a 6-digit OTP
            const resetOtp = generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

            // Set OTP expiration time (e.g., 10 minutes from now)
            const otpExpiration = new Date();
            otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);

            // Update user with the OTP and expiration
            user.otp = resetOtp;
            user.otpExpiration = otpExpiration;
            await user.save();

            // Send OTP to user's email
            await EmailVerificationProvider(email, resetOtp);

            return 'OTP sent to email';
        } catch (error) {
            console.error('Error in forgot password:', error);
            return 'Internal server error';
        }
    }

    async resetPassword(otp: string, password: string): Promise<string> {
        try {
            const user = await AuthUser.findOne({ where: { otp } });
            if (!user) {
                throw new Error('Invalid OTP');
            }
    
            const now = new Date();
            if (user.otpExpiration && user.otpExpiration < now) {
                throw new Error('OTP has expired');
            }
    
            user.password = password;
            await user.save();
    
            user.otp = "";
            await user.save();
    
            return "Password reset successfully";
        } catch (error) {
            console.error('Error in reset password:', error);
            throw error; // Rethrow the error for proper handling
        }
    }
    
}

export const authServices = new AuthService();
