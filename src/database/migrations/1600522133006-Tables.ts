import {MigrationInterface, QueryRunner} from "typeorm";

export class Tables1600522133006 implements MigrationInterface {
    name = 'Tables1600522133006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notas_fiscais" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "valor" integer NOT NULL, "quantidade" integer NOT NULL, "produtoId" uuid, CONSTRAINT "PK_c7dcf62527c4f388d8494aa5f55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fornecedores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "produto_id" uuid, CONSTRAINT "PK_6ba3f90e4a18a597d11b763fc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "volume" integer NOT NULL, "deposito_id" uuid, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "endereco" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "rua" character varying NOT NULL, "bairro" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, "numero" integer NOT NULL, CONSTRAINT "PK_2a6880f71a7f8d1c677bb2a32a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lojas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "endereco_id" uuid, CONSTRAINT "REL_24dda160e234b0cfb4bea6c01e" UNIQUE ("endereco_id"), CONSTRAINT "PK_a81d267d5c303abf4ded1065275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "depositos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "loja_id" uuid, "endereco_id" uuid, CONSTRAINT "REL_e19a552f02c0a081f255ed6af2" UNIQUE ("endereco_id"), CONSTRAINT "PK_89a002afddf6f6a464c54f6d3cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD CONSTRAINT "FK_f26003fc324fc2166af8bc687f1" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD CONSTRAINT "FK_863f50cd0a6ca866cb2a4ed81bd" FOREIGN KEY ("produto_id") REFERENCES "notas_fiscais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_b9f0c345a2ff021353b347625d6" FOREIGN KEY ("deposito_id") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4" FOREIGN KEY ("endereco_id") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_dd9794eeab6ae4f4ee08e4c049f" FOREIGN KEY ("loja_id") REFERENCES "lojas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_e19a552f02c0a081f255ed6af27" FOREIGN KEY ("endereco_id") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_e19a552f02c0a081f255ed6af27"`);
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_dd9794eeab6ae4f4ee08e4c049f"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_b9f0c345a2ff021353b347625d6"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP CONSTRAINT "FK_863f50cd0a6ca866cb2a4ed81bd"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP CONSTRAINT "FK_f26003fc324fc2166af8bc687f1"`);
        await queryRunner.query(`DROP TABLE "depositos"`);
        await queryRunner.query(`DROP TABLE "lojas"`);
        await queryRunner.query(`DROP TABLE "endereco"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "fornecedores"`);
        await queryRunner.query(`DROP TABLE "notas_fiscais"`);
    }

}
