import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'workout_history';
export class CreateTableWorkoutHistory1676064764366 implements MigrationInterface {
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
            name: 'workout_id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'cycle_id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'executed_at',
            type: 'timestamp',
            isPrimary: false,
            isGenerated: false,
            isNullable: false,
            isUnique: false,
            default: 'now()',
          },
        ],
        indices: [{ columnNames: ['id'], isUnique: true, name: 'workout_history_id_idx' }],
        foreignKeys: [
          {
            columnNames: ['workout_id'],
            referencedTableName: 'workouts',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
