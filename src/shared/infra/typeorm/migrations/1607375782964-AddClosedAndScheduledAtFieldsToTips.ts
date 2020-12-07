import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddClosedAndScheduledAtFieldsToTips1607375782964
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('tips', [
      new TableColumn({
        name: 'closed',
        type: 'boolean',
        default: false,
      }),
      new TableColumn({
        name: 'scheduled_at',
        type: 'timestamp with time zone',
        default: "now() + interval '1' hour",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tips', 'scheduled_at');
    await queryRunner.dropColumn('tips', 'closed');
  }
}
