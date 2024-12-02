import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdvertisiment1733052826308 implements MigrationInterface {
    name = 'AddAdvertisiment1733052826308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_622d6e7043376c503cba2325dab"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_728700aee449838965f5cf87cee"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_c40870af5230c4d117729c8299f"`);
        await queryRunner.query(`CREATE TABLE "ads_views" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "viewDate" TIMESTAMP NOT NULL DEFAULT now(), "adsId" uuid, CONSTRAINT "PK_f5be310e71e69e63062658a19b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ads_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`);
        await queryRunner.query(`CREATE TABLE "ads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "currency" "public"."ads_currency_enum" NOT NULL, "location" text NOT NULL, "condition" text NOT NULL, "year" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "mileage" integer NOT NULL, "editQuantity" integer NOT NULL DEFAULT '0', "photos" text, "modelId" uuid, "userId" uuid, CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "imageUrls"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "views"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "dealerId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_27f0e938a6329d73630f5e52a7" ON "car" ("name") `);
        await queryRunner.query(`ALTER TABLE "ads_views" ADD CONSTRAINT "FK_9932763c34a671c7ae4c251a4f1" FOREIGN KEY ("adsId") REFERENCES "ads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_728700aee449838965f5cf87cee" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_85e5a845f02dd479ae592a7b23d" FOREIGN KEY ("dealerId") REFERENCES "dealers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_66dee3f23f07a1e0b4d83e4d58e" FOREIGN KEY ("modelId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_e72da72588dc5b91427a9adda71" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_e72da72588dc5b91427a9adda71"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_66dee3f23f07a1e0b4d83e4d58e"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_85e5a845f02dd479ae592a7b23d"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_728700aee449838965f5cf87cee"`);
        await queryRunner.query(`ALTER TABLE "ads_views" DROP CONSTRAINT "FK_9932763c34a671c7ae4c251a4f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_27f0e938a6329d73630f5e52a7"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "dealerId"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "modelId" uuid`);
        await queryRunner.query(`ALTER TABLE "car" ADD "createdById" uuid`);
        await queryRunner.query(`ALTER TABLE "car" ADD "views" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "car" ADD "isActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "imageUrls" text`);
        await queryRunner.query(`ALTER TABLE "car" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "location" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "currency" character varying(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "year" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "ads"`);
        await queryRunner.query(`DROP TYPE "public"."ads_currency_enum"`);
        await queryRunner.query(`DROP TABLE "ads_views"`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_c40870af5230c4d117729c8299f" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_728700aee449838965f5cf87cee" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_622d6e7043376c503cba2325dab" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
