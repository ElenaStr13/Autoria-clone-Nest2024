import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPhoneImage1732967683315 implements MigrationInterface {
    name = 'UserPhoneImage1732967683315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "image" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
