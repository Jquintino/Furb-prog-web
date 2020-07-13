import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ select: false })
    password: string;

}
