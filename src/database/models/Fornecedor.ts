import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import Produto from "./NotaFiscal";
import NotaFiscal from "./NotaFiscal";


@Entity('fornecedores')
export default class Fornecedor extends DefaultAttributes {
    @Column()
    nome: string;

    @OneToMany(type => Produto, produto => Produto)
    @JoinColumn({ name: 'produto_id' })
    produto: Produto[]

    @OneToMany(type => NotaFiscal, notaFiscal => NotaFiscal)
    @JoinColumn({ name: 'notaFiscal_id' })
    notaFiscal: NotaFiscal[]



}

