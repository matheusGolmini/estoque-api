import {MigrationInterface, QueryRunner} from "typeorm";

export class ajuste1600536215546 implements MigrationInterface {
    name = 'ajuste1600536215546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deposito_produto" ("depositosId" uuid NOT NULL, "produtosId" uuid NOT NULL, CONSTRAINT "PK_c7b25a24e28c1475e3876d0c99b" PRIMARY KEY ("depositosId", "produtosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c7524adc2dc365efb66fac8e62" ON "deposito_produto" ("depositosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a9ba7db6840db6ac1fd56e02f5" ON "deposito_produto" ("produtosId") `);
        await queryRunner.query(`ALTER TABLE "deposito_produto" ADD CONSTRAINT "FK_c7524adc2dc365efb66fac8e621" FOREIGN KEY ("depositosId") REFERENCES "depositos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deposito_produto" ADD CONSTRAINT "FK_a9ba7db6840db6ac1fd56e02f56" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deposito_produto" DROP CONSTRAINT "FK_a9ba7db6840db6ac1fd56e02f56"`);
        await queryRunner.query(`ALTER TABLE "deposito_produto" DROP CONSTRAINT "FK_c7524adc2dc365efb66fac8e621"`);
        await queryRunner.query(`DROP INDEX "IDX_a9ba7db6840db6ac1fd56e02f5"`);
        await queryRunner.query(`DROP INDEX "IDX_c7524adc2dc365efb66fac8e62"`);
        await queryRunner.query(`DROP TABLE "deposito_produto"`);
    }

}
