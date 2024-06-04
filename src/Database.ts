import mongoose from "mongoose";
import dotenv from 'dotenv';

const Connection = async (): Promise<void> => {
    dotenv.config();
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/backend`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as mongoose.ConnectOptions);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export {Connection};
