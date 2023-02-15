import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'workout_history' })
export default class WorkoutHistory {
  @PrimaryColumn()
  id!: string;

  @Column({ name: 'workout_id' })
  workoutId!: string;

  @Column({ name: 'cycle_id' })
  cycleId!: string;

  @Column({ name: 'executed_at' })
  executedAt!: Date;

  //todo: relations
}
