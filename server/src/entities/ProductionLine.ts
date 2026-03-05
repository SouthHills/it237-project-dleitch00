import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Plant} from "./Plant.js";
import {Product} from "./Product.js";


@Entity("PRODUCTION_LINE")
export class ProductionLine
{
    @PrimaryColumn({name: "PLANT_ID", type: "int", nullable: false})
    plantID!: number;

    @PrimaryColumn({name: "PROD_ID", type: "int", nullable: false})
    productID!: number;

    @Column({name: "PROD_QUANT", type: "int"})
    productQuantity!: number;

    @Column({name: "PROD_MIN", type: "int"})
    productMinimum!: number;

    //Many to One
    @ManyToOne(() => Plant, (plant) => plant.productionLines)
        @JoinColumn({name: "PLANT_ID", referencedColumnName: "plantID"})
    plant!: Plant;

    @ManyToOne(() => Product, (product) => product.productionLines)
        @JoinColumn({name: "PROD_ID", referencedColumnName: "productID"})
    product!: Product;




}