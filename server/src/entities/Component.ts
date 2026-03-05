import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Vendor} from "./Vendor.js";
import {Blueprint} from "./Blueprint.js";

@Entity("COMPONENTS")
export class Component
{
    @PrimaryGeneratedColumn({name: "COMP_ID", type: "int"})
    componentID!: number;

    @Column({name: "COMP_NAME", type: "varchar", length: 255})
    componentName!: string;

    @Column({name: "COMP_DESCRIPTION", type: "varchar", length: 255})
    componentDescription!: string;

    @Column({name: "COMP_MIN_QUANT", type: "int"})
    componentMinimumQuantity!: number;

    @Column({ name: "COMP_COST", type: "decimal", precision: 8, scale: 2})
    componentPrice!: number;

    @Column({ name: "VEND_ID", type: "int"})
    vendorID!: number;

    @ManyToOne(() => Vendor, vendor => vendor.components)
        @JoinColumn({ name: "VEND_ID", referencedColumnName: "vendorID" })
    vendor!: Vendor;

    @OneToMany(() => Blueprint, blueprint => blueprint.componentID)
    blueprints!: Blueprint[];



}
