import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity ("PRODUCT")

export class Product{
    @PrimaryColumn({
        name: "PROD_ID",
        type: "int",
    })
    id!: number;

}