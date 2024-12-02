import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCarEntitiy1732194954705 implements MigrationInterface {
    name = 'AddCarEntitiy1732194954705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "year" integer NOT NULL, "price" numeric(10,2) NOT NULL, "currency" character varying(3) NOT NULL, "location" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "car"`);
    }

}
