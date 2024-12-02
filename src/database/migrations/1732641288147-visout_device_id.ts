import { MigrationInterface, QueryRunner } from "typeorm";

export class VisoutDeviceId1732641288147 implements MigrationInterface {
    name = 'VisoutDeviceId1732641288147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9769b295a8d670435ce210ba15"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "deviceId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deviceId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deviceId" character varying`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "deviceId" text NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_9769b295a8d670435ce210ba15" ON "refresh_tokens" ("deviceId") `);
    }

}
