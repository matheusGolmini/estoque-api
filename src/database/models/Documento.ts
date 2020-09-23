import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, OneToOne, JoinColumn } from "typeorm";
import Produto from "./Produto";
import Fornecedor from "./Fornecedor";
import Deposito from "./Deposito";


@Entity('documentos')
export default class Documento {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @CreateDateColumn({ name: 'date' })
    createdAt: Date

    @Column()
    valor: number;

    @Column()
    quantidade: number;

    @ManyToOne(type => Fornecedor, fornecedor => Fornecedor)
    fornecedor: Fornecedor

    @ManyToOne(type => Produto, produto => Produto)
    @JoinColumn({ name: 'produto_id' })
    produto: Produto

    @ManyToOne(type => Deposito)
    deposito: Deposito[]
}

