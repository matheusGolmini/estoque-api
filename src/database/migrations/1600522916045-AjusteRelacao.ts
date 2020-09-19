import {MigrationInterface, QueryRunner} from "typeorm";

export class AjusteRelacao1600522916045 implements MigrationInterface {
    name = 'AjusteRelacao1600522916045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP CONSTRAINT "FK_f26003fc324fc2166af8bc687f1"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP CONSTRAINT "FK_863f50cd0a6ca866cb2a4ed81bd"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" RENAME COLUMN "produtoId" TO "fornecedorId"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP COLUMN "produto_id"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "fornecedorId" uuid`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "notaFiscalId" uuid`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD CONSTRAINT "FK_1c0ccef91751e01932d6e110463" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_d219ecef87e3d5fedfbc955cb3f" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_f475ee68ffb5ea2ef708926c10e" FOREIGN KEY ("notaFiscalId") REFERENCES "notas_fiscais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_f475ee68ffb5ea2ef708926c10e"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_d219ecef87e3d5fedfbc955cb3f"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP CONSTRAINT "FK_1c0ccef91751e01932d6e110463"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "notaFiscalId"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "fornecedorId"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD "produto_id" uuid`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" RENAME COLUMN "fornecedorId" TO "produtoId"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD CONSTRAINT "FK_863f50cd0a6ca866cb2a4ed81bd" FOREIGN KEY ("produto_id") REFERENCES "notas_fiscais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD CONSTRAINT "FK_f26003fc324fc2166af8bc687f1" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
