import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import Produto from "./Produto";
import Fornecedor from "./Fornecedor";


@Entity('notas_fiscais')
export default class NotaFiscal {
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

    @OneToMany(type => Produto, produto => Produto)
    @JoinTable({ name: 'produto_id'})
    produto: Produto[]
}

