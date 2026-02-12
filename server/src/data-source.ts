import {loadEnvFile} from 'node:process';
loadEnvFile('server/.env');
import {DataSource} from "typeorm";
import {Component} from "./entities/Component";
import {Employee} from "./entities/Employee";
import {Plant} from "./entities/Plant";
import {Product} from "./entities/Product";
import {Vendor} from "./entities/Vendor";
import {ProductionLine} from "./entities/ProductionLine";
import {Blueprint} from "./entities/Blueprint";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1", //127.0.0.1
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // set to false in production
    logging: true,
    entities: [Component, Employee, Plant, Product, Vendor, ProductionLine, Blueprint],
    subscribers: [],
    migrations: []
});
