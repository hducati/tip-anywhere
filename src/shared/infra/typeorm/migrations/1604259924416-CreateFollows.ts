import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFollows1604259924416 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'follows',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate',
          },
          {
            name: 'followed_user__id',
            type: 'uuid',
          },
          {
            name: 'follower_user_id',
            type: 'uuid',
          },
          {
            name: 'is_following',
            type: 'boolean',
            default: 'true',
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
            name: 'FollowedUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['followed_user__id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FollowerUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['follower_user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('follows');
  }
}
