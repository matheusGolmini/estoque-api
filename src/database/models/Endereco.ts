import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, OneToOne } from "typeorm";
import Deposito from "./Deposito";
import Loja from "./Loja";
import Fornecedor from "./Fornecedor";


@Entity('enderecos')
export default class Endereco extends DefaultAttributes {
    @Column()
    rua: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    numero: number;

    @Column()
    pais: string;

    @Column()
    cep: string;

    @OneToOne(type => Deposito, deposito => Deposito)
    deposito: Deposito

    @OneToOne(type => Loja, loja => Loja)
    loja: Loja

    @OneToOne(type => Fornecedor, fornecedor => Fornecedor)
    fornecedor: Fornecedor

}
