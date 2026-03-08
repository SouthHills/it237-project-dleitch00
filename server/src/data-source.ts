import {DataSource} from "typeorm";
import {Component} from "./entities/Component.js";
import {Employee} from "./entities/Employee.js";
import {Plant} from "./entities/Plant.js";
import {Product} from "./entities/Product.js";
import {Vendor} from "./entities/Vendor.js";
import {ProductionLine} from "./entities/ProductionLine.js";
import {Blueprint} from "./entities/Blueprint.js";
import dotenv from "dotenv";
import {existsSync} from "fs";
import {fileURLToPath} from "url";
import {dirname, resolve} from "path";

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try multiple possible .env locations for local development
const possibleEnvPaths = [
    './.env',                                    // Current working directory
    resolve(__dirname, '../../.env'),            // Server root from src/
    resolve(__dirname, '../.env'),               // One level up from src/
    resolve(process.cwd(), '.env')               // Process working directory
];

// Only load .env file if it exists (for local development)
let envLoaded = false;
for (const envPath of possibleEnvPaths) {
    if (existsSync(envPath)) {
        dotenv.config({ path: envPath });
        console.log(`Loaded environment variables from: ${envPath}`);
        envLoaded = true;
        break;
    }
}

if (!envLoaded) {
    console.log('No .env file found, using environment variables from system/container');
}


export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_HOST, //127.0.0.1
    port: 1433,
    username: process.env.DB_USER,
    password: process.env.SA_PASSWORD,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        //only way i could make it work in docker
    },
    synchronize: false, // set to false in production
    logging: true,
    entities: [Component, Employee, Plant, Product, Vendor, ProductionLine, Blueprint],
    subscribers: [],
    migrations: []
});

