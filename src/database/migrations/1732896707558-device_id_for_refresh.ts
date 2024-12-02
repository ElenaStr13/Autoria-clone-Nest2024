import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceIdForRefresh1732896707558 implements MigrationInterface {
    name = 'DeviceIdForRefresh1732896707558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Додати колонку, яка дозволяє NULL
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "deviceId" text`);

        // Оновити існуючі записи, щоб уникнути NULL
        await queryRunner.query(`UPDATE "refresh_tokens" SET "deviceId" = 'default-device-id' WHERE "deviceId" IS NULL`);

        // Встановити обмеження NOT NULL
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ALTER COLUMN "deviceId" SET NOT NULL`);

        // Додати індекс
        await queryRunner.query(`CREATE INDEX "IDX_9769b295a8d670435ce210ba15" ON "refresh_tokens" ("deviceId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Видалити індекс
        await queryRunner.query(`DROP INDEX "public"."IDX_9769b295a8d670435ce210ba15"`);

        // Видалити колонку
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "deviceId"`);
    }

}
