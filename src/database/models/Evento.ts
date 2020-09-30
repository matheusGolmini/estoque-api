import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn } from "typeorm";
import Produto from "./Produto";
import Fornecedor from "./Fornecedor";
import Deposito from "./Deposito";


@Entity('evento')
export default class Evento {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @CreateDateColumn({ name: 'date' })
    createdAt: Date

    @Column()
    valor: number;

    @Column()
    quantidade: number;

    @Column()
    tipo_evento: string;

    @ManyToOne(type => Fornecedor, fornecedor => Fornecedor, { nullable: true })
    fornecedor: Fornecedor

    @ManyToOne(type => Produto, produto => Produto)
    @JoinColumn({ name: 'produto_id' })
    produto: Produto

    @ManyToOne(type => Deposito)
    deposito: Deposito[]
}

