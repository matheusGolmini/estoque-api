import {MigrationInterface, QueryRunner} from "typeorm";

export class novosCampos1600526755447 implements MigrationInterface {
    name = 'novosCampos1600526755447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enderecos" ADD "pais" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "enderecos" ADD "cep" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enderecos" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "enderecos" DROP COLUMN "pais"`);
    }

}
