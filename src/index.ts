import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import CorsConfig from './config/cors.config';
import {Connection} from './Database';
import { SqlConnection } from './connections/mysql.connection';
import { authRoutes } from './routes/auth.routes';
import { adminRoutes } from './routes/admin.routes';
import { productRoutes } from './routes/product.routes';
import { userRoutes } from './routes/user.routes';
// Initialize the server

type ErrorHandler = (err : Error, req : Request, res : Response, next : NextFunction) => void;

const initializeServer = async():Promise<void> => {
    dotenv.config();
    const port: string = `${process.env.PORT}`;
    const app : Application = express();

    app.use(CorsConfig);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded(
        {
            extended : true
        }
    ));
    app.use('/api/v1/auth',authRoutes);
    app.use('/api/v1/admin', adminRoutes);
    app.use('/api/v1/job', productRoutes);
    app.use('/api/v1/user', userRoutes);

    try {
        await Connection()
        await SqlConnection();
        const server: http.Server = http.createServer(app);

        server.listen(port, (): void => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }

};

initializeServer();
