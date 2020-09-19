import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, OneToMany, JoinColumn, OneToOne } from "typeorm";
import Deposito from "./Deposito";
import Endereco from "./Endereco";


@Entity('lojas')
export default class Loja extends DefaultAttributes {
    @Column()
    nome: string;

    @OneToOne(type => Endereco, endereco => Endereco, { cascade: true })
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco

    @OneToMany(type => Deposito, deposito => Deposito)
    deposito: Deposito[]
   
}

