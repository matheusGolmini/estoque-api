import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToMany } from "typeorm";
import Fornecedor from "./Fornecedor";
import Documento from "./Documento"
import Deposito from "./Deposito";


@Entity('produtos')
export default class Produto extends DefaultAttributes {
    @Column()
    nome: string;

    @Column()
    volume: number;

    @ManyToMany(type => Fornecedor)
    fornecedor: Fornecedor[]

    @ManyToMany(type => Documento)
    documento: Documento[]

    @ManyToMany(type => Deposito)
    deposito: Deposito[]
}

