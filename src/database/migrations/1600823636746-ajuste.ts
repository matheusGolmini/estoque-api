import {MigrationInterface, QueryRunner} from "typeorm";

export class ajuste1600823636746 implements MigrationInterface {
    name = 'ajuste1600823636746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "FK_eb3d49fcd0570e6f2726221794f"`);
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "UQ_eb3d49fcd0570e6f2726221794f"`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "FK_eb3d49fcd0570e6f2726221794f" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "FK_eb3d49fcd0570e6f2726221794f"`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "UQ_eb3d49fcd0570e6f2726221794f" UNIQUE ("produto_id")`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "FK_eb3d49fcd0570e6f2726221794f" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
