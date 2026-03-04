import {DataSource} from "typeorm";
import {Component} from "./entities/Component.js";
import {Employee} from "./entities/Employee.js";
import {Plant} from "./entities/Plant.js";
import {Product} from "./entities/Product.js";
import {Vendor} from "./entities/Vendor.js";
import {ProductionLine} from "./entities/ProductionLine.js";
import {Blueprint} from "./entities/Blueprint.js";



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

