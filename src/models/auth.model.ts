import { DataTypes, Model, UUIDV4 } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../connections/mysql.connection';
import { IAuthUser } from '../interfaces/auth.interface';
import { Roles } from '../enums/auth.enum';

class AuthUser extends Model<IAuthUser> {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public username!: string;
    public password!: string;
    public mobile!: string;
    public country!: string;
    public profilePicture?: string;
    public isEmailVerified!: boolean;
    public isMobileOtpVerified!: boolean;
    public browserType!: string;
    public otp!: string;
    public otpExpiration!: Date;
    public otpVerified! : boolean;
    public emailResendOtp!: boolean;
    public mobileResendOtp!: boolean;
    public role!: Roles;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public hashPassword(): void {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    public checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}

AuthUser.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        allowNull: false, 
        defaultValue: UUIDV4,
    },
    firstName: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    lastName: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    username: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    mobile: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    country: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    profilePicture: { 
        type: DataTypes.STRING, 
        allowNull: true,
    },
    isEmailVerified: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false, 
    },
    isMobileOtpVerified: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false, 
    },
    browserType: { 
        type: DataTypes.STRING, 
        allowNull: true,
    },
    otp: { 
        type: DataTypes.STRING, 
        allowNull: true,
    },
    otpVerified: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false, 
    },
    otpExpiration: { 
        type: DataTypes.DATE, 
        allowNull: true,
    },
    emailResendOtp: { 
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: false,
    },
    mobileResendOtp: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false,
    },
    role: {
        type: DataTypes.ENUM(...Object.values(Roles)),
        allowNull: false,
        defaultValue: Roles.USER,
    },
}, {
    sequelize,
    tableName: 'auth_users',
    modelName: 'AuthUser',
    timestamps: true,
    hooks: { 
        beforeCreate: (user: AuthUser) => { 
            user.hashPassword();
        },
        beforeUpdate: (user: AuthUser) => {
            if (user.changed('password')) {
                user.hashPassword();
            }
        },
    },
});

export default AuthUser;
