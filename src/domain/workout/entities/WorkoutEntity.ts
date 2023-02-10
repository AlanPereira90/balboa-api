import { Column, Entity } from 'typeorm';

@Entity({ name: 'workouts' })
export default class WorkoutsEntity {
  @Column()
  id!: string;

  @Column()
  name!: string;

  @Column()
  details!: Array<Record<string, unknown>>;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'updated_at' })
  updatedAt!: Date;
}
