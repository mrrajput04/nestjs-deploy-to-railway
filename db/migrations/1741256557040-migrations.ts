import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741256557040 implements MigrationInterface {
    name = 'Migrations1741256557040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
