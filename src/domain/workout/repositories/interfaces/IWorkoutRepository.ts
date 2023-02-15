import WorkoutEntity from '../../entities/WorkoutEntity';

export interface IWorkoutRepository {
  create(workout: WorkoutEntity): Promise<string>;
}
