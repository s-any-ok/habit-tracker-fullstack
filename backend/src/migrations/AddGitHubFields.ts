import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddGitHubFields1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'githubId',
        type: 'varchar',
        isNullable: true,
        isUnique: true,
      }),
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isNullable: true,
      }),
    ]);

    // Make googleId nullable (якщо ще не nullable)
    await queryRunner.changeColumn(
      'users',
      'googleId',
      new TableColumn({
        name: 'googleId',
        type: 'varchar',
        isNullable: true,
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['githubId', 'username']);
  }
}
