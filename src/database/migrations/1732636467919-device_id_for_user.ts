import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceIdForUser1732636467919 implements MigrationInterface {
    name = 'DeviceIdForUser1732636467919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deviceId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deviceId"`);
    }

}
