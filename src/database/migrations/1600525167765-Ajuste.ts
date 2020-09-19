import {MigrationInterface, QueryRunner} from "typeorm";

export class Ajuste1600525167765 implements MigrationInterface {
    name = 'Ajuste1600525167765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lojas" DROP CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4"`);
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_e19a552f02c0a081f255ed6af27"`);
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "rua" character varying NOT NULL, "bairro" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, "numero" integer NOT NULL, CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_e19a552f02c0a081f255ed6af27" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_e19a552f02c0a081f255ed6af27"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_e19a552f02c0a081f255ed6af27" FOREIGN KEY ("endereco_id") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4" FOREIGN KEY ("endereco_id") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
