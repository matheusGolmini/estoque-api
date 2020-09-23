import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToMany, OneToOne } from "typeorm";
import Fornecedor from "./Fornecedor";
import Documento from "./Documento"


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
}

