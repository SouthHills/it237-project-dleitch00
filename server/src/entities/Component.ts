import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("COMPONENTS")
export class Component
{
    @PrimaryColumn({name: "COMP_ID", type: "int", nullable: false})
    componentID!: number;

    @Column({name: "COMP_NAME", type: "varchar", length: 255})
    componentName!: string;

    @Column({name: "COMP_DESCRIPTION", type: "varchar", length: 255})
    componentDescription!: string;

    @Column({name: "COMP_MIN_QUANT", type: "int"})
    componentMinimumQuantity!: number;

    @Column({ name: "COMP_COST", type: "decimal", precision: 8, scale: 2})
    componentPrice!: number;

}
