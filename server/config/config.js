/* eslint-disable no-undef */
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
export const sequelize = new Sequelize({
    database: process.env.VITE_PGDATABASE,
    username: process.env.VITE_PGUSER,
    password: process.env.VITE_PGPASSWORD,
    port: process.env.VITE_PGPORT,
    host: process.env.VITE_PGHOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});


// export const sequelize = new Sequelize({
//     database: process.env.VITE_PGDATABASE,
//     username: process.env.VITE_PGUSER,
//     password: process.env.VITE_PGPASSWORD,
//     port: process.env.VITE_PGPORT,
//     host: process.env.VITE_PGHOST,
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     define: {
//         timestamps: false
//     }
// });




