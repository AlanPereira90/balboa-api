import WorkoutEntity from 'src/domain/workout/entities/WorkoutEntity';
import { container, Lifecycle, registry, scoped } from 'tsyringe';
import { DataSource } from 'typeorm';

@scoped(Lifecycle.ResolutionScoped)
@registry([
  {
    token: 'WorkoutDao',
    useFactory: () => container.resolve<DataSource>('PostgresConnection').getRepository(WorkoutEntity),
  },
])
export default class WorkoutDao {}
