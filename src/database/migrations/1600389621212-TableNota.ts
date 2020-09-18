import {MigrationInterface, QueryRunner} from "typeorm";

export class TableNota1600389621212 implements MigrationInterface {
    name = 'TableNota1600389621212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD "created_At" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
