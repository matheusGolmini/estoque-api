import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import Produto from "./NotaFiscal";


@Entity('fornecedores')
export default class Fornecedor extends DefaultAttributes {
    @Column()
    nome: string;

    @ManyToOne(type => Produto, produto => Produto)
    @JoinColumn({ name: 'produto_id' })
    produto: Produto[]

}

