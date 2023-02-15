import { Column, Entity, PrimaryColumn } from 'typeorm';
import { WorkoutDetail } from '../types/workout';

@Entity({ name: 'workouts' })
export default class WorkoutEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'jsonb', array: false, default: "'[]'", nullable: false })
  details!: Array<WorkoutDetail>;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'updated_at' })
  updatedAt!: Date;
}
