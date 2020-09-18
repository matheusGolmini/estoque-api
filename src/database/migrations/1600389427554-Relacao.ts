import {MigrationInterface, QueryRunner} from "typeorm";

export class Relacao1600389427554 implements MigrationInterface {
    name = 'Relacao1600389427554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_bf02e978c9c151004dc44882eda"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP CONSTRAINT "FK_f1c45ab0d9ca215d8670a129823"`);
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_cb3f3d86e5435ff89273c079db1"`);
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "fornecedor_id" TO "deposito_id"`);
        await queryRunner.query(`ALTER TABLE "depositos" RENAME COLUMN "produtoId" TO "loja_id"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP COLUMN "deposito_id"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD "produto_id" uuid`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD CONSTRAINT "FK_863f50cd0a6ca866cb2a4ed81bd" FOREIGN KEY ("produto_id") REFERENCES "notas_fiscais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_b9f0c345a2ff021353b347625d6" FOREIGN KEY ("deposito_id") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_dd9794eeab6ae4f4ee08e4c049f" FOREIGN KEY ("loja_id") REFERENCES "lojas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_dd9794eeab6ae4f4ee08e4c049f"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_b9f0c345a2ff021353b347625d6"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP CONSTRAINT "FK_863f50cd0a6ca866cb2a4ed81bd"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP COLUMN "produto_id"`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD "deposito_id" uuid`);
        await queryRunner.query(`ALTER TABLE "depositos" RENAME COLUMN "loja_id" TO "produtoId"`);
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "deposito_id" TO "fornecedor_id"`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_cb3f3d86e5435ff89273c079db1" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD CONSTRAINT "FK_f1c45ab0d9ca215d8670a129823" FOREIGN KEY ("deposito_id") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_bf02e978c9c151004dc44882eda" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
