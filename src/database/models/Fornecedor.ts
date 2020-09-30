import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm";
import Produto from "./Produto";
import Evento from "./Evento";
import Endereco from "./Endereco";


@Entity('fornecedores')
export default class Fornecedor extends DefaultAttributes {
    @Column()
    nome: string;

    @ManyToMany(type => Produto)
    @JoinTable({name: "fornecedor_produto"})
    produto: Produto[]

    @OneToMany(type => Evento, evento => Evento)
    @JoinColumn({ name: 'Evento_id' })
    evento: Evento[]

    @OneToOne(type => Endereco, endereco => Endereco, { cascade: true })
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco

}

