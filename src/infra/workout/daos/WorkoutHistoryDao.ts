import WorkoutHistory from 'src/domain/workout/entities/WorkoutHistoryEntity';
import { container, Lifecycle, registry, scoped } from 'tsyringe';
import { DataSource } from 'typeorm';

@scoped(Lifecycle.ResolutionScoped)
@registry([
  {
    token: 'WorkoutHistoryDao',
    useFactory: () => container.resolve<DataSource>('PostgresConnection').getRepository(WorkoutHistory),
  },
])
export default class WorkoutDao {}
