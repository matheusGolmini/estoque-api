import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToMany, OneToOne, OneToMany } from "typeorm";
import Fornecedor from "./Fornecedor";
import Evento from "./Evento";
import ProdutoEstoque from "./ProdutoEstoque";


@Entity('produtos')
export default class Produto extends DefaultAttributes {
    @Column()
    nome: string;

    @Column()
    volume: number;

    @ManyToMany(type => Fornecedor)
    fornecedor: Fornecedor[]

    @OneToOne(type => Evento, evento => Evento)
    evento: Evento

    @OneToMany(type => ProdutoEstoque, produtoEstoque => ProdutoEstoque)
    produtoEstoque: ProdutoEstoque
}

