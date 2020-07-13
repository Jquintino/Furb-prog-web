import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from "typeorm";
import { Produto_Comanda } from "./Produto_Comanda";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    desc: string;

    @Column({ type: "float", precision: 8, scale: 5 })
    preco: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    timestamp: Date;

    @OneToMany(type => Produto_Comanda, produtos => produtos.id_comanda)
    comandas: Produto_Comanda[];
}
