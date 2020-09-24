import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToMany, OneToOne, OneToMany } from "typeorm";
import Fornecedor from "./Fornecedor";
import Documento from "./Documento";
import ProdutoEstoque from "./ProdutoEstoque"


@Entity('produtos')
export default class Produto extends DefaultAttributes {
    @Column()
    nome: string;

    @Column()
    volume: number;

    @Column({ type: "float4" })
    valor_medio: number;

    @ManyToMany(type => Fornecedor)
    fornecedor: Fornecedor[]

    @OneToOne(type => Documento, documento => Documento)
    documento: Documento

    @OneToMany(type => ProdutoEstoque, produtoEstoque => ProdutoEstoque)
    produtoEstoque: ProdutoEstoque
}

