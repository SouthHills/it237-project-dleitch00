import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("BLUE_PRINT")
export class Blueprint
{
    @PrimaryColumn({name: "PROD_ID", type: "int", nullable: false})
    productID!: number;

    @PrimaryColumn({name: "COMP_ID", type: "int", nullable: false})
    componentID!: number;

    @Column({name: "COMP_AMOUNT", type: "int"})
    componentAmount!: number;

}