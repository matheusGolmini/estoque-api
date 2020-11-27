import { Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";

@Entity('produtos')
export default class Produto {
    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    nome: string;

    @Column()
    quantidade: number;

    @Column()
    user_id: string
}

