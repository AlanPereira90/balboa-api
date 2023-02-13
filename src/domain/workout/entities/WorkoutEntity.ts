import { Column, Entity } from 'typeorm';
import { WorkoutDetail } from '../types/workout';

@Entity({ name: 'workouts' })
export default class WorkoutEntity {
  @Column()
  id!: string;

  @Column()
  name!: string;

  @Column()
  details!: Array<WorkoutDetail>;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'updated_at' })
  updatedAt!: Date;
}
