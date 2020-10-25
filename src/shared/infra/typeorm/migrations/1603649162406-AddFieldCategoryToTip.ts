import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldCategoryToTip1603649162406
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tips',
      new TableColumn({
        name: 'sport',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tips', 'sport');
  }
}
