import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import Produto from "./Produto";


@Entity('notas_fiscais')
export default class NotaFiscal {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @CreateDateColumn({ name: 'date' })
    createdAt: Date

    @Column()
    tipNota: string;

    @ManyToOne(type => Produto, produto => Produto)
    @JoinTable({ name: 'produto_id'})
    produto: Produto[]
}

