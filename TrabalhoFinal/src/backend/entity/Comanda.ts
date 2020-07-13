import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from "typeorm";
import { Produto_Comanda } from "./Produto_Comanda";
import { type } from "os";

@Entity()
export class Comanda {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    mesa: string;

    @Column({ default: () => "0" })
    estado: String;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    timestamp: Date;

    @OneToMany(type => Produto_Comanda, produtos => produtos.id_comanda)
    produtos: Produto_Comanda[];

}
