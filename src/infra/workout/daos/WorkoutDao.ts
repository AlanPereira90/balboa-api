import { container, Lifecycle, registry, scoped } from 'tsyringe';
import { DataSource } from 'typeorm';
import WorkoutEntity from '../../../domain/workout/entities/WorkoutEntity';

@scoped(Lifecycle.ResolutionScoped)
@registry([
  {
    token: 'WorkoutDao',
    useFactory: () => container.resolve<DataSource>('PostgresConnection').getRepository(WorkoutEntity),
  },
])
export default class WorkoutDao {}
