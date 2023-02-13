import WorkoutEntity from '../../entities/WorkoutEntity';

export interface IworkoutRepository {
  create(workout: WorkoutEntity): Promise<string>;
}
