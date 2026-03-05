import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Component} from "./Component.js";

@Entity("VENDOR")
export class Vendor
{
    @PrimaryGeneratedColumn({name: "VEND_ID", type: "int"})
    vendorID!: number;

    @Column({name: "VEND_NAME", type: "varchar", length: 100})
    vendorName!: string;

    @Column({name: "VEND_SPECIALIZATION", type: "varchar", length: 255})
    vendorSpecialization!: string;

    @Column({name: "VEND_HQ_ZIP", type: "char", length:5})
    vendorHqZIP!: string;

    @Column({name: "VEND_HQ_NATION", type: "char", length:2})
    vendorHqNation!: string;

    @Column({name: "VEND_HQ_STREET", type: "varchar", length: 100})
    vendorHqStreet!: string;

    @Column({name: "VEND_HQ_CITY", type: "varchar"})
    vendorHqCity!: string;

    @OneToMany(() => Component, component => component.vendorID)
    components!: Component[];

}


