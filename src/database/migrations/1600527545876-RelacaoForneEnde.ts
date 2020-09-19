import {MigrationInterface, QueryRunner} from "typeorm";

export class RelacaoForneEnde1600527545876 implements MigrationInterface {
    name = 'RelacaoForneEnde1600527545876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD "endereco_id" uuid`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD CONSTRAINT "UQ_7b2161ddde97b488c274c6c7714" UNIQUE ("endereco_id")`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD CONSTRAINT "FK_7b2161ddde97b488c274c6c7714" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP CONSTRAINT "FK_7b2161ddde97b488c274c6c7714"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP CONSTRAINT "UQ_7b2161ddde97b488c274c6c7714"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP COLUMN "endereco_id"`);
    }

}
