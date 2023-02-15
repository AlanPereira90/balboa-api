import { container, Lifecycle, registry, scoped } from 'tsyringe';
import { DataSource } from 'typeorm';
import WorkoutHistory from '../../../domain/workout/entities/WorkoutHistoryEntity';

@scoped(Lifecycle.ResolutionScoped)
@registry([
  {
    token: 'WorkoutHistoryDao',
    useFactory: () => container.resolve<DataSource>('PostgresConnection').getRepository(WorkoutHistory),
  },
])
export default class WorkoutDao {}
