import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany } from "typeorm";
import Produto from "./Produto";
import Fornecedor from "./Fornecedor";


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

    @ManyToMany(type => Produto)
    @JoinTable({name:  "produto_documento" })
    produto: Produto[]
}

