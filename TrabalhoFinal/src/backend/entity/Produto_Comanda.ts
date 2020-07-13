import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne } from "typeorm";
import { Comanda } from "./Comanda";
import { Produto } from "./Produto";

@Entity()
export class Produto_Comanda {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qtd: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    timestamp: Date;


    @ManyToOne(type => Comanda, id_comanda => id_comanda.produtos)
    id_comanda: Comanda;

    @ManyToOne(type => Produto, id_produto => id_produto.comandas)
    id_produto: Produto;

}
