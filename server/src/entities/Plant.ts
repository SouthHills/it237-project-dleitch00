import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Employee} from "./Employee.js";
import {ProductionLine} from "./ProductionLine.js";

@Entity("PLANT")
export class Plant
{
    @PrimaryGeneratedColumn({name: "PLANT_ID", type: "int"})
    plantID!: number;

    @Column({name: "PLANT_ZIP", type: "char", length: 5})
    plantZIP!: string;

    @Column({name: "PLANT_NATION", type: "char", length: 2})
    plantNation!: string;

    @Column({name: "PLANT_STREET", type: "varchar", length:80})
    plantStreet!: string;

    @Column({name: "PLANT_NAME", type: "varchar", length:40})
    plantName!: string;

    @Column({name: "PLANT_STATUS", type: "char", length: 1})
    plantStatus!: string;

    @Column({name: "PLANT_CITY", type: "varchar"})
    plantCity!: string;


    @OneToMany(() => Employee, employee => employee.plantID)
    employees!: Employee[];

    @OneToMany(() => ProductionLine, productionLine => productionLine.plantID)
    productionLines!: ProductionLine[];
}