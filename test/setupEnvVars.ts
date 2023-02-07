import faker from '@faker-js/faker';

process.env.NODE_ENV = 'test';
process.env.POSTGRES_USER_NAME = faker.lorem.word();
process.env.POSTGRES_PASSWORD = faker.lorem.word();
process.env.POSTGRES_HOST = faker.lorem.word();
process.env.POSTGRES_DATABASE = faker.lorem.word();
