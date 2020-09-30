import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1601423672357 implements MigrationInterface {
    name = 'tables1601423672357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "evento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "valor" integer NOT NULL, "quantidade" integer NOT NULL, "tipo_evento" character varying NOT NULL, "fornecedorId" uuid, "produto_id" uuid, "depositoId" uuid, CONSTRAINT "PK_ceb2e9607555230aee6aff546b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto_estoque" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "quantidade" integer NOT NULL, "valor_medio" real, "produto_id" uuid, "deposito_id" uuid, CONSTRAINT "PK_1e9eed82e58b51480b358bcafab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "volume" integer NOT NULL, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fornecedores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "endereco_id" uuid, CONSTRAINT "REL_7b2161ddde97b488c274c6c771" UNIQUE ("endereco_id"), CONSTRAINT "PK_6ba3f90e4a18a597d11b763fc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "rua" character varying NOT NULL, "bairro" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, "numero" integer NOT NULL, "pais" character varying NOT NULL, "cep" character varying NOT NULL, CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lojas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "endereco_id" uuid, CONSTRAINT "REL_24dda160e234b0cfb4bea6c01e" UNIQUE ("endereco_id"), CONSTRAINT "PK_a81d267d5c303abf4ded1065275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "depositos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "volume_max" integer NOT NULL, "tipo" character varying NOT NULL, "volume_livre" integer NOT NULL, "loja_id" uuid, "endereco_id" uuid, CONSTRAINT "REL_e19a552f02c0a081f255ed6af2" UNIQUE ("endereco_id"), CONSTRAINT "PK_89a002afddf6f6a464c54f6d3cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fornecedor_produto" ("fornecedoresId" uuid NOT NULL, "produtosId" uuid NOT NULL, CONSTRAINT "PK_389884c2293a9d35704a5e7743f" PRIMARY KEY ("fornecedoresId", "produtosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_baaac687c6a327c42d7ed21f20" ON "fornecedor_produto" ("fornecedoresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a0c5842eaf19b080e017aae8a" ON "fornecedor_produto" ("produtosId") `);
        await queryRunner.query(`ALTER TABLE "evento" ADD CONSTRAINT "FK_ac0ea409ae3260c5cf0af98e2f0" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evento" ADD CONSTRAINT "FK_d634a9595a5f1219c6b038ddd11" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evento" ADD CONSTRAINT "FK_701807c4c99fe98c2d693114474" FOREIGN KEY ("depositoId") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto_estoque" ADD CONSTRAINT "FK_2d6c2db533915914efc4255013d" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto_estoque" ADD CONSTRAINT "FK_ea5cbc7fbfa6a48ee0beb8506c4" FOREIGN KEY ("deposito_id") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD CONSTRAINT "FK_7b2161ddde97b488c274c6c7714" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_dd9794eeab6ae4f4ee08e4c049f" FOREIGN KEY ("loja_id") REFERENCES "lojas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_e19a552f02c0a081f255ed6af27" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fornecedor_produto" ADD CONSTRAINT "FK_baaac687c6a327c42d7ed21f209" FOREIGN KEY ("fornecedoresId") REFERENCES "fornecedores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fornecedor_produto" ADD CONSTRAINT "FK_5a0c5842eaf19b080e017aae8a5" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fornecedor_produto" DROP CONSTRAINT "FK_5a0c5842eaf19b080e017aae8a5"`);
        await queryRunner.query(`ALTER TABLE "fornecedor_produto" DROP CONSTRAINT "FK_baaac687c6a327c42d7ed21f209"`);
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_e19a552f02c0a081f255ed6af27"`);
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_dd9794eeab6ae4f4ee08e4c049f"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP CONSTRAINT "FK_7b2161ddde97b488c274c6c7714"`);
        await queryRunner.query(`ALTER TABLE "produto_estoque" DROP CONSTRAINT "FK_ea5cbc7fbfa6a48ee0beb8506c4"`);
        await queryRunner.query(`ALTER TABLE "produto_estoque" DROP CONSTRAINT "FK_2d6c2db533915914efc4255013d"`);
        await queryRunner.query(`ALTER TABLE "evento" DROP CONSTRAINT "FK_701807c4c99fe98c2d693114474"`);
        await queryRunner.query(`ALTER TABLE "evento" DROP CONSTRAINT "FK_d634a9595a5f1219c6b038ddd11"`);
        await queryRunner.query(`ALTER TABLE "evento" DROP CONSTRAINT "FK_ac0ea409ae3260c5cf0af98e2f0"`);
        await queryRunner.query(`DROP INDEX "IDX_5a0c5842eaf19b080e017aae8a"`);
        await queryRunner.query(`DROP INDEX "IDX_baaac687c6a327c42d7ed21f20"`);
        await queryRunner.query(`DROP TABLE "fornecedor_produto"`);
        await queryRunner.query(`DROP TABLE "depositos"`);
        await queryRunner.query(`DROP TABLE "lojas"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
        await queryRunner.query(`DROP TABLE "fornecedores"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "produto_estoque"`);
        await queryRunner.query(`DROP TABLE "evento"`);
    }

}
