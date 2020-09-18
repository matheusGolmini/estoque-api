import {MigrationInterface, QueryRunner} from "typeorm";

export class Relacao1600388943859 implements MigrationInterface {
    name = 'Relacao1600388943859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_f475ee68ffb5ea2ef708926c10e"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_656b11fba37e4c64b37e7bec2fd"`);
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_3ffbf28c4576756aeeac90adc1a"`);
        await queryRunner.query(`ALTER TABLE "depositos" RENAME COLUMN "lojaId" TO "produtoId"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "notaFiscalId"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "depositoId"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD "produtoId" uuid`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD "deposito_id" uuid`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD CONSTRAINT "FK_f26003fc324fc2166af8bc687f1" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD CONSTRAINT "FK_f1c45ab0d9ca215d8670a129823" FOREIGN KEY ("deposito_id") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_cb3f3d86e5435ff89273c079db1" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_cb3f3d86e5435ff89273c079db1"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP CONSTRAINT "FK_f1c45ab0d9ca215d8670a129823"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP CONSTRAINT "FK_f26003fc324fc2166af8bc687f1"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP COLUMN "deposito_id"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP COLUMN "produtoId"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "depositoId" uuid`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "notaFiscalId" uuid`);
        await queryRunner.query(`ALTER TABLE "depositos" RENAME COLUMN "produtoId" TO "lojaId"`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_3ffbf28c4576756aeeac90adc1a" FOREIGN KEY ("lojaId") REFERENCES "lojas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_656b11fba37e4c64b37e7bec2fd" FOREIGN KEY ("depositoId") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_f475ee68ffb5ea2ef708926c10e" FOREIGN KEY ("notaFiscalId") REFERENCES "notas_fiscais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
