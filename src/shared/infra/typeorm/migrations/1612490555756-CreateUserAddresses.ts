import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserAddresses1612490555756
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_addresses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: true,
            length: '40',
          },
          {
            name: 'zip_code',
            type: 'varchar',
            isNullable: true,
            length: '8',
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
            length: '2',
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
            length: '60',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
            length: '8',
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
            length: '60',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'UserAddress',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_addresses');
  }
}
