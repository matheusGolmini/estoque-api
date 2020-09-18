import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, OneToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import Produto from "./Produto";
import Loja from "./Loja";


@Entity('depositos')
export default class Deposito extends DefaultAttributes {
    @Column()
    nome: string;

    @OneToMany(type => Produto, produto => Produto)
    produto: Produto[]

    @ManyToOne(type => Loja, loja => Loja)
    @JoinColumn({ name: 'loja_id' })
    loja: Loja
}

