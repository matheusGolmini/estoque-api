import {MigrationInterface, QueryRunner} from "typeorm";

export class ajustaRelacionamento1600388675912 implements MigrationInterface {
    name = 'ajustaRelacionamento1600388675912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lojas" DROP CONSTRAINT "FK_f1c45ab0d9ca215d8670a129823"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP COLUMN "deposito_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lojas" ADD "deposito_id" uuid`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD CONSTRAINT "FK_f1c45ab0d9ca215d8670a129823" FOREIGN KEY ("deposito_id") REFERENCES "depositos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
