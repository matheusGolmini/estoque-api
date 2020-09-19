import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Produto from "./Produto";
import Loja from "./Loja";
import Endereco from "./Endereco";


@Entity('depositos')
export default class Deposito extends DefaultAttributes {
    @Column()
    nome: string;

    @OneToMany(type => Produto, produto => Produto)
    produto: Produto[]

    @ManyToOne(type => Loja, loja => Loja)
    @JoinColumn({ name: 'loja_id' })
    loja: Loja

    @OneToOne(type => Endereco, endereco => Endereco)
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco
}

