import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOtherEntities1732269946504 implements MigrationInterface {
    name = 'AddOtherEntities1732269946504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dealers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "createdDealerId" uuid, CONSTRAINT "PK_4d0d8be9eac6e1822ad16d21194" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_users_users" ("permissionId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_b561a5db58992f97f10d31062b4" PRIMARY KEY ("permissionId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07a36b98dd038db7473acff777" ON "permission_users_users" ("permissionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_18b51dd0e5301d161cb56b8d6c" ON "permission_users_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "users_permissions_permission" ("usersId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_3404b5fe99c4ada03bc7d85b58b" PRIMARY KEY ("usersId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a8ae4c08841340a12bb7e2db62" ON "users_permissions_permission" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb779b42732e822b848f9f32ad" ON "users_permissions_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "model" ADD "brandId" uuid`);
        await queryRunner.query(`ALTER TABLE "car" ADD "imageUrls" text`);
        await queryRunner.query(`ALTER TABLE "car" ADD "isActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "views" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "car" ADD "createdById" uuid`);
        await queryRunner.query(`ALTER TABLE "car" ADD "brandId" uuid`);
        await queryRunner.query(`ALTER TABLE "car" ADD "modelId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dealerId" uuid`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_7996700d600159cdf20dc0d0816" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_622d6e7043376c503cba2325dab" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_728700aee449838965f5cf87cee" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_c40870af5230c4d117729c8299f" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dealers" ADD CONSTRAINT "FK_5b7132be26790c775a917160443" FOREIGN KEY ("createdDealerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3f0bafe01288ec83331616e52d4" FOREIGN KEY ("dealerId") REFERENCES "dealers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_users_users" ADD CONSTRAINT "FK_07a36b98dd038db7473acff7778" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_users_users" ADD CONSTRAINT "FK_18b51dd0e5301d161cb56b8d6cb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_permissions_permission" ADD CONSTRAINT "FK_a8ae4c08841340a12bb7e2db62a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_permissions_permission" ADD CONSTRAINT "FK_bb779b42732e822b848f9f32ad5" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_permissions_permission" DROP CONSTRAINT "FK_bb779b42732e822b848f9f32ad5"`);
        await queryRunner.query(`ALTER TABLE "users_permissions_permission" DROP CONSTRAINT "FK_a8ae4c08841340a12bb7e2db62a"`);
        await queryRunner.query(`ALTER TABLE "permission_users_users" DROP CONSTRAINT "FK_18b51dd0e5301d161cb56b8d6cb"`);
        await queryRunner.query(`ALTER TABLE "permission_users_users" DROP CONSTRAINT "FK_07a36b98dd038db7473acff7778"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3f0bafe01288ec83331616e52d4"`);
        await queryRunner.query(`ALTER TABLE "dealers" DROP CONSTRAINT "FK_5b7132be26790c775a917160443"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_c40870af5230c4d117729c8299f"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_728700aee449838965f5cf87cee"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_622d6e7043376c503cba2325dab"`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_7996700d600159cdf20dc0d0816"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dealerId"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "views"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "imageUrls"`);
        await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "brandId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb779b42732e822b848f9f32ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a8ae4c08841340a12bb7e2db62"`);
        await queryRunner.query(`DROP TABLE "users_permissions_permission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18b51dd0e5301d161cb56b8d6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07a36b98dd038db7473acff777"`);
        await queryRunner.query(`DROP TABLE "permission_users_users"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "dealers"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}
