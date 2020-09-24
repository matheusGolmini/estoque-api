import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, ManyToOne } from "typeorm";
import Produto from "./Produto";
import Deposito from "./Deposito";


@Entity('produto_estoque')
export default class ProdutoEstoque extends DefaultAttributes {
    @Column()
    quantidade: number

    @ManyToOne(type => Produto, produto => Produto)
    @JoinColumn({ name: 'produto_id' })
    produto: Produto[]

    @ManyToOne(type => Deposito, deposito => Deposito)
    @JoinColumn({ name: 'deposito_id' })
    deposito: Deposito
}

