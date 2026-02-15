import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("VENDOR")
export class Vendor
{
    @PrimaryColumn({name: "VEND_ID", type: "int", nullable: false})
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

}


