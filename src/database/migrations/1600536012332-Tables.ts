import {MigrationInterface, QueryRunner} from "typeorm";

export class Tables1600536012332 implements MigrationInterface {
    name = 'Tables1600536012332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "documentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "valor" integer NOT NULL, "quantidade" integer NOT NULL, "fornecedorId" uuid, CONSTRAINT "PK_30b7ee230a352e7582842d1dc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lojas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "endereco_id" uuid, CONSTRAINT "REL_24dda160e234b0cfb4bea6c01e" UNIQUE ("endereco_id"), CONSTRAINT "PK_a81d267d5c303abf4ded1065275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "rua" character varying NOT NULL, "bairro" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, "numero" integer NOT NULL, "pais" character varying NOT NULL, "cep" character varying NOT NULL, CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fornecedores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "endereco_id" uuid, CONSTRAINT "REL_7b2161ddde97b488c274c6c771" UNIQUE ("endereco_id"), CONSTRAINT "PK_6ba3f90e4a18a597d11b763fc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "volume" integer NOT NULL, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "depositos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "volume_max" integer NOT NULL, "tipo" character varying NOT NULL, "volume_livre" integer NOT NULL, "loja_id" uuid, "endereco_id" uuid, CONSTRAINT "REL_e19a552f02c0a081f255ed6af2" UNIQUE ("endereco_id"), CONSTRAINT "PK_89a002afddf6f6a464c54f6d3cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto_documento" ("documentosId" uuid NOT NULL, "produtosId" uuid NOT NULL, CONSTRAINT "PK_958e4a96dac54ed35b72089a3da" PRIMARY KEY ("documentosId", "produtosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d851e083f974834cfa7133b302" ON "produto_documento" ("documentosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_357505dd11b2caf0f5d7413553" ON "produto_documento" ("produtosId") `);
        await queryRunner.query(`CREATE TABLE "fornecedor_produto" ("fornecedoresId" uuid NOT NULL, "produtosId" uuid NOT NULL, CONSTRAINT "PK_389884c2293a9d35704a5e7743f" PRIMARY KEY ("fornecedoresId", "produtosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_baaac687c6a327c42d7ed21f20" ON "fornecedor_produto" ("fornecedoresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a0c5842eaf19b080e017aae8a" ON "fornecedor_produto" ("produtosId") `);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "FK_207de8164180ed577c7da71b175" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lojas" ADD CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD CONSTRAINT "FK_7b2161ddde97b488c274c6c7714" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_dd9794eeab6ae4f4ee08e4c049f" FOREIGN KEY ("loja_id") REFERENCES "lojas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_e19a552f02c0a081f255ed6af27" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto_documento" ADD CONSTRAINT "FK_d851e083f974834cfa7133b3023" FOREIGN KEY ("documentosId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto_documento" ADD CONSTRAINT "FK_357505dd11b2caf0f5d74135530" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fornecedor_produto" ADD CONSTRAINT "FK_baaac687c6a327c42d7ed21f209" FOREIGN KEY ("fornecedoresId") REFERENCES "fornecedores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fornecedor_produto" ADD CONSTRAINT "FK_5a0c5842eaf19b080e017aae8a5" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fornecedor_produto" DROP CONSTRAINT "FK_5a0c5842eaf19b080e017aae8a5"`);
        await queryRunner.query(`ALTER TABLE "fornecedor_produto" DROP CONSTRAINT "FK_baaac687c6a327c42d7ed21f209"`);
        await queryRunner.query(`ALTER TABLE "produto_documento" DROP CONSTRAINT "FK_357505dd11b2caf0f5d74135530"`);
        await queryRunner.query(`ALTER TABLE "produto_documento" DROP CONSTRAINT "FK_d851e083f974834cfa7133b3023"`);
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_e19a552f02c0a081f255ed6af27"`);
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_dd9794eeab6ae4f4ee08e4c049f"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP CONSTRAINT "FK_7b2161ddde97b488c274c6c7714"`);
        await queryRunner.query(`ALTER TABLE "lojas" DROP CONSTRAINT "FK_24dda160e234b0cfb4bea6c01e4"`);
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "FK_207de8164180ed577c7da71b175"`);
        await queryRunner.query(`DROP INDEX "IDX_5a0c5842eaf19b080e017aae8a"`);
        await queryRunner.query(`DROP INDEX "IDX_baaac687c6a327c42d7ed21f20"`);
        await queryRunner.query(`DROP TABLE "fornecedor_produto"`);
        await queryRunner.query(`DROP INDEX "IDX_357505dd11b2caf0f5d7413553"`);
        await queryRunner.query(`DROP INDEX "IDX_d851e083f974834cfa7133b302"`);
        await queryRunner.query(`DROP TABLE "produto_documento"`);
        await queryRunner.query(`DROP TABLE "depositos"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "fornecedores"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
        await queryRunner.query(`DROP TABLE "lojas"`);
        await queryRunner.query(`DROP TABLE "documentos"`);
    }

}
