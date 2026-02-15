import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("PLANT")
export class Plant
{
    @PrimaryColumn({name: "PLANT_ID", type: "int", nullable: false})
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
}