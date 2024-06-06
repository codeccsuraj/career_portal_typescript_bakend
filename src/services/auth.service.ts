import { IAuthUser, ILoginResponse, ILoginUser } from "../interfaces/auth.interface";
import bcrypt from 'bcrypt';
import AuthUser from "../models/auth.model";
import jwt from 'jsonwebtoken';
import { generate } from "otp-generator";
import EmailVerificationProvider from "../config/email.config";


class AuthService {
    private generateOtp() {
        return generate(6,{ digits : true, lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars : false})
    }

    private setOtpExpiration (minutes : number) {
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + minutes);
        return expiration;
    }
    async addUser(userDetails: IAuthUser): Promise<ILoginResponse | null> {
        try {
            const existingUserWithEmail = await AuthUser.findOne({
                where: { email: userDetails.email },
            });
    
            if (existingUserWithEmail) {
                return { message: 'Email already exists', loading: false, token: '', user: null };
            }
    
            // Check if user with the provided mobile number already exists
            const existingMobileUser = await AuthUser.findOne({ where: { mobile: userDetails.mobile } });
            if (existingMobileUser) {
                return { message: 'Mobile number already exists', loading: false, token: '', user: null };
            }
    
            // Generate OTP
            const resetOtp = this.generateOtp();
            const otpExpiration = this.setOtpExpiration(10);
        
            // Save user details along with OTP and expiration time
            const newUser = await AuthUser.create({
                ...userDetails,
                otp: resetOtp,
                otpExpiration: otpExpiration,
            });
    
            // Send OTP via email
            await EmailVerificationProvider(userDetails.email, resetOtp);
    
            // Return a response indicating successful user creation
            return {
                message: 'User added successfully',
                loading: false,
                token: '', // Assuming you handle token generation elsewhere
                user: newUser.toJSON() as IAuthUser, // Convert the user to JSON format
            };
        } catch (error) {
            console.error("Error adding user:", error);
            return null;
        }
    }
    async verifyUserEmail(otpToken: string): Promise<ILoginResponse> {
        try {
            // Find the user by OTP
            const user = await AuthUser.findOne({ where: { otp: otpToken } });
    
            if (!user) {
                return { message: 'User not found', loading: false, token: '', user: null };
            }
    
            if (user.otpExpiration && new Date() > user.otpExpiration) {
                return { message: 'OTP has expired', loading: false, token: '', user: null };
            }
    
            // Mark email as verified
            user.otp = "";
            user.isEmailVerified = true;
            await user.save();
    
            // Generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email, role : user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            return { message: 'Email verified successfully', loading: false, token, user: user };
        } catch (error) {
            console.error('Error in verifying email:', error);
            return { message: 'Internal server error', loading: false, token: '', user: null };
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
            const token = jwt.sign({ id: user.id, email: user.email, role : user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

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
            const resetOtp = this.generateOtp();

            // Set OTP expiration time (e.g., 10 minutes from now)
            const otpExpiration = this.setOtpExpiration(10);

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
    async verifyOtpForPasswordReset(otp: string): Promise<string> {
        try {
            const user = await AuthUser.findOne({ where: { otp } });
            if (!user) {
                return 'Invalid OTP';
            }

            if (user.otpExpiration && new Date() > user.otpExpiration) {
                return 'OTP has expired';
            }
            console.log("this is ", otp)
            const otpVerifiedExpiration = this.setOtpExpiration(10); // Set OTP verified state expiration
            user.otp = "";
            user.otpVerified = true;
            user.otpExpiration = otpVerifiedExpiration;
            await user.save();

            return 'OTP verified successfully';
        } catch (error) {
            console.error('Error in verifying OTP:', error);
            return 'Internal server error';
        }
    }
    async resetPassword(email: string, newPassword: string): Promise<string> {
        try {
            const user = await AuthUser.findOne({ where: { email } });
            if (!user) {
                return 'User not found';
            }

            if (!user.otpVerified) { 
                return 'OTP verification required';
            }

            user.password = newPassword;
            user.otpVerified = false; // Reset OTP verification flag
            await user.save();

            return 'Password reset successfully';
        } catch (error) {
            console.error('Error in resetting password:', error);
            return 'Internal server error';
        }
    }
    
}

export const authServices = new AuthService();
