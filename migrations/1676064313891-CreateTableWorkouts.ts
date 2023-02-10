import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'workouts';
export class CreateTableWorkouts1676064313891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isPrimary: false,
            isGenerated: false,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'data',
            type: 'jsonb',
            isPrimary: false,
            isGenerated: false,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'details',
            type: 'jsonb',
            isPrimary: false,
            isGenerated: false,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isPrimary: false,
            isGenerated: false,
            isNullable: false,
            isUnique: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isPrimary: false,
            isGenerated: false,
            isNullable: false,
            isUnique: false,
            default: 'now()',
          },
        ],
        indices: [{ columnNames: ['id'], isUnique: true, name: 'workout_id_idx' }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
