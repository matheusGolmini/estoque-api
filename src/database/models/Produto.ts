import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import Fornecedor from "./Fornecedor";
import NotaFiscal from "./NotaFiscal"
import Deposito from "./Deposito";


@Entity('produtos')
export default class Produto extends DefaultAttributes {
    @Column()
    nome: string;

    @Column()
    volume: number;

    @ManyToOne(type => Fornecedor, fornecedor => Fornecedor)
    fornecedor: Fornecedor

    @ManyToOne(type => NotaFiscal, notaFiscal => NotaFiscal)
    notaFiscal: NotaFiscal

    @ManyToOne(type => Deposito, deposito => Deposito)
    @JoinColumn({ name: 'deposito_id' })
    deposito: Deposito
}

