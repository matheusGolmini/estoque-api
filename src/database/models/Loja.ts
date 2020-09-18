import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, OneToMany, JoinColumn } from "typeorm";
import Deposito from "./Deposito";


@Entity('lojas')
export default class Loja extends DefaultAttributes {
    @Column()
    nome: string;

    @Column()
    password: string;

    @OneToMany(type => Deposito, deposito => Deposito)
    deposito: Deposito
   
}

