import {Column, Entity, PrimaryColumn} from "typeorm";

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

}