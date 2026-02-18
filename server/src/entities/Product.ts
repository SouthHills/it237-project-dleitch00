import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Blueprint} from "./Blueprint.js";
import {ProductionLine} from "./ProductionLine.js";

@Entity("PRODUCT")
export class Product
{
    @PrimaryGeneratedColumn({name: "PROD_ID", type: "int"})
    productID!: number;

    @Column({name: "PROD_NAME", type: "varchar", length: 255})
    productName!: string;

    @Column({name: "PROD_DESCRIPTION", type: "varchar", length: 255})
    productDescription!: string;

    @Column({name: "PROD_PRICE", type: "decimal", precision: 8, scale: 2})
    productPrice!: number;


    @OneToMany(() => ProductionLine, productionLine => productionLine.productID)
    productionLines!: ProductionLine[];

    @OneToMany(() => Blueprint, blueprint => blueprint.productID)
    blueprints!: Blueprint[];

}