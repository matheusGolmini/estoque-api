import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, OneToOne, JoinColumn } from "typeorm";
import Produto from "./Produto";
import Fornecedor from "./Fornecedor";
import Deposito from "./Deposito";


@Entity('notas_saida')
export default class NotaSaida {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @CreateDateColumn({ name: 'date' })
    createdAt: Date

    @Column({nullable: true})
    valor: number;

    @Column()
    quantidade: number;

    @ManyToOne(type => Produto, produto => Produto)
    @JoinColumn({ name: 'produto_id' })
    produto: Produto[]

    @ManyToOne(type => Deposito)
    @JoinColumn({ name: 'deposito_id' })
    deposito: Deposito[]
}

