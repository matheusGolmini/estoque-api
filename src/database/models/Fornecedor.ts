import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import Produto from "./NotaFiscal";
import NotaFiscal from "./NotaFiscal";
import Endereco from "./Endereco";


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

    @OneToOne(type => Endereco, endereco => Endereco, { cascade: true })
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco

}

