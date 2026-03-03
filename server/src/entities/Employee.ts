import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Plant} from "./Plant.js";

@Entity("EMPLOYEES")
export class Employee
{
    @PrimaryGeneratedColumn({name: "EMP_ID", type: "int"})
    employeeID!: number;

    @Column({name: "EMP_JOB_TITLE", type: "varchar", length: 60})
    employeeJobTitle!: string;

    @Column({name: "EMP_IS_ACTIVE", type: "char", length: 1})
    employeeStatus!: string;

    @Column({name: "EMP_IS_ADMIN", type: "char", length:1})
    employeeIsAdmin!: string;

    @Column({name: "EMP_FIRST_NAME", type: "varchar", length:64})
    employeeFirstName!: string;

    @Column({name: "EMP_MIDDLE_INITIAL", type: "char", length: 1, nullable: true})
    employeeMiddleInitial!: string | null;

    @Column({name: "EMP_LAST_NAME", type: "varchar", length:64})
    employeeLastName!: string;

    @Column({ name: "EMP_SALARY", type: "decimal", precision: 9, scale: 2})
    employeeSalary!: number;

    @Column({ name: "EMP_DOB", type: "date"})
    employeeBirthday!: Date;

    @Column({name: "EMP_USERNAME", type: "varchar", length:30})
    employeeUsername!: string;

    @Column({name: "EMP_PASSWORD", type: "varchar", length:100, nullable: true})
    employeePassword!: string | null;

    @Column({name: "PLANT_ID", type: "int", nullable: true})
    plantID!: number | null;

    @Column({name: "EMP_TOKEN", type: "varchar", length: 255, nullable: true})
    employeeToken!: string | null;

    @ManyToOne(() => Plant, plant => plant.employees)
        @JoinColumn({name: "PLANT_ID", referencedColumnName: "plantID"})
    plant!: Plant;

}

