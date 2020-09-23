import {MigrationInterface, QueryRunner} from "typeorm";

export class ajuste1600821957618 implements MigrationInterface {
    name = 'ajuste1600821957618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_eb60a5a1b86bbc1e956383a115b"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "documentoId"`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD "produto_id" uuid`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "UQ_eb3d49fcd0570e6f2726221794f" UNIQUE ("produto_id")`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "FK_eb3d49fcd0570e6f2726221794f" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "FK_eb3d49fcd0570e6f2726221794f"`);
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "UQ_eb3d49fcd0570e6f2726221794f"`);
        await queryRunner.query(`ALTER TABLE "documentos" DROP COLUMN "produto_id"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "documentoId" uuid`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_eb60a5a1b86bbc1e956383a115b" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
