import faker from '@faker-js/faker';
import WorkoutEntity from '../../../src/domain/workout/entities/WorkoutEntity';

export default class WorkoutEntityBuilder {
  public static build(fields: Partial<WorkoutEntity> = {}): WorkoutEntity {
    return {
      id: faker.datatype.uuid(),
      name: faker.lorem.word(),
      details: [],
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      ...fields,
    };
  }
}
