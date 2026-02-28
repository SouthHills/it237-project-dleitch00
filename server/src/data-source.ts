
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
    host: "cloud-devops-fnl.database.windows.net", //127.0.0.1
    port: 1433,
    username: 'master',
    password: 'AdminPwd123!!',
    database: 'company',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    synchronize: false, // set to false in production
    logging: true,
    entities: [Component, Employee, Plant, Product, Vendor, ProductionLine, Blueprint],
    subscribers: [],
    migrations: []
});

