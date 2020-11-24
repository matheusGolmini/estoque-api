import { Column, Entity } from "typeorm";

@Entity('produtos')
export default class Produto {
    @Column()
    nome: string;

    @Column()
    quantidade: number;

    @Column()
    user_id: string
}

