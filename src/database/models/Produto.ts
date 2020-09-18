import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, OneToMany, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import Fornecedor from "./Fornecedor";
import NotaFiscal from "./NotaFiscal"
import Deposito from "./Deposito";


@Entity('produtos')
export default class Produto extends DefaultAttributes {
    @Column()
    nome: string;

    @Column()
    medida: number;

    @Column()
    valor: number;

    @OneToMany(type => Fornecedor, fornecedor => Fornecedor)
    fornecedor: Fornecedor

    @OneToMany(type => NotaFiscal, notaFiscal => NotaFiscal)
    notaFiscal: NotaFiscal

    @ManyToOne(type => Deposito, deposito => Deposito)
    @JoinColumn({ name: 'deposito_id' })
    deposito: Deposito
}

