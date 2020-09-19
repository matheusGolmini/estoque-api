import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, OneToOne } from "typeorm";
import Deposito from "./Deposito";
import Loja from "./Loja";


@Entity('endereco')
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

    @OneToOne(type => Deposito, deposito => Deposito)
    deposito: Deposito

    @OneToOne(type => Loja, loja => Loja)
    loja: Loja

}
