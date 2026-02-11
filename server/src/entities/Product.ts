import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("PRODUCT")
export class Product
{
    @PrimaryColumn({name: "PROD_ID", type: "int", nullable: false})
    productID!: number;

    @Column({name: "PROD_NAME", type: "varchar", length: 255})
    productName!: string;

    @Column({name: "PROD_DESCRIPTION", type: "varchar", length: 255})
    productDescription!: string;

    @Column({name: "PROD_PRICE", type: "decimal", precision: 8, scale: 2})
    productPrice!: number;

}