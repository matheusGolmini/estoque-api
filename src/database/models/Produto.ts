import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToMany, OneToOne, OneToMany } from "typeorm";
import Fornecedor from "./Fornecedor";
import Documento from "./Documento";
import ProdutoEstoque from "./ProdutoEstoque"
import NotaSaida from "./NotaSaida";


@Entity('produtos')
export default class Produto extends DefaultAttributes {
    @Column()
    nome: string;

    @Column()
    volume: number;

    @ManyToMany(type => Fornecedor)
    fornecedor: Fornecedor[]

    @OneToOne(type => Documento, documento => Documento)
    documento: Documento

    @OneToMany(type => NotaSaida, notaSaida => NotaSaida)
    notaSaida: NotaSaida

    @OneToMany(type => ProdutoEstoque, produtoEstoque => ProdutoEstoque)
    produtoEstoque: ProdutoEstoque
}

