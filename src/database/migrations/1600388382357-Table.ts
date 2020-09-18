import {MigrationInterface, QueryRunner} from "typeorm";

export class Table1600388382357 implements MigrationInterface {
    name = 'Table1600388382357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notas_fiscais" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "tipNota" character varying NOT NULL, CONSTRAINT "PK_c7dcf62527c4f388d8494aa5f55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fornecedores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, CONSTRAINT "PK_6ba3f90e4a18a597d11b763fc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "medida" integer NOT NULL, "valor" integer NOT NULL, "fornecedor_id" uuid, "notaFiscalId" uuid, "depositoId" uuid, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lojas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "password" character varying NOT NULL, "deposito_id" uuid, CONSTRAINT "PK_a81d267d5c303abf4ded1065275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "depositos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "lojaId" uuid, CONSTRAINT "PK_89a002afddf6f6a464c54f6d3cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_bf02e978c9c151004dc44882eda" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_f475ee68ffb5ea2ef708926c10e" FOREIGN KEY ("notaFiscalId") REFERENCES "notas_fiscais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_656b11fba37e4c64b37e7bec2fd" FOREIGN KEY ("depositoId") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD CONSTRAINT "FK_f1c45ab0d9ca215d8670a129823" FOREIGN KEY ("deposito_id") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_3ffbf28c4576756aeeac90adc1a" FOREIGN KEY ("lojaId") REFERENCES "lojas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_3ffbf28c4576756aeeac90adc1a"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP CONSTRAINT "FK_f1c45ab0d9ca215d8670a129823"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_656b11fba37e4c64b37e7bec2fd"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_f475ee68ffb5ea2ef708926c10e"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_bf02e978c9c151004dc44882eda"`);
        await queryRunner.query(`DROP TABLE "depositos"`);
        await queryRunner.query(`DROP TABLE "lojas"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "fornecedores"`);
        await queryRunner.query(`DROP TABLE "notas_fiscais"`);
    }

}
