import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Product} from "./Product.js";
import {Component} from "./Component.js";

@Entity("BLUE_PRINT")
export class Blueprint
{
    @PrimaryColumn({name: "PROD_ID", type: "int", nullable: false})
    productID!: number;

    @PrimaryColumn({name: "COMP_ID", type: "int", nullable: false})
    componentID!: number;

    @Column({name: "COMP_AMOUNT", type: "int"})
    componentAmount!: number;

    @ManyToOne(() => Product, product => product.blueprints)
    @JoinColumn({ name: "PROD_ID", referencedColumnName: "productID" })
    product!: Product;

    @ManyToOne(() => Component, component => component.blueprints)
    @JoinColumn({ name: "COMP_ID", referencedColumnName: "componentID" })
    component!: Component;

}