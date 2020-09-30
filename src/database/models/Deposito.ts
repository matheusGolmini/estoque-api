import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import Loja from "./Loja";
import Endereco from "./Endereco";
import Evento from "./Evento";


@Entity('depositos')
export default class Deposito extends DefaultAttributes {
    @Column()
    nome: string;

    @Column({name:  "volume_max"})
    volumeMax: number;

    @Column()
    tipo: string;

    @Column({name:  "volume_livre"})
    volumeLivre: number;

    @OneToMany(type => Evento, evento => Evento)
    evento: Evento[]

    @ManyToOne(type => Loja, loja => Loja)
    @JoinColumn({ name: 'loja_id' })
    loja: Loja

    @OneToOne(type => Endereco, endereco => Endereco, { cascade: true })
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco

}

