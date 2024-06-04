import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

// Initialize Sequelize connection parameters
const database: string = process.env.SQL_DBNAME as string;
const user: string = process.env.SQL_DBUSER as string;
const password: string = process.env.SQL_DBPASSWORD as string;
const host: string = process.env.SQL_HOSTURL as string;

// Create a Sequelize instance
export const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    port: Number(process.env.SQL_DB_PORT || 3306),
    logging: false,
});

// Function to establish connection with MySQL
const SqlConnection = async (): Promise<void> => {
    try {
        // Authenticate Sequelize instance
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
          // Synchronize all defined models with the database
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export { SqlConnection };
