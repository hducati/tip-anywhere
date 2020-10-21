import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddStatusFieldToTips1603316744902
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tips',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tips', 'status');
  }
}
