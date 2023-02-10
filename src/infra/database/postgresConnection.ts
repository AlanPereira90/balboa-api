import { container } from 'tsyringe';
import { DataSource } from 'typeorm';

import { ENV, POSTGRES } from '../../domain/common/utils/environment';
import { logger } from '../logger/logger';

export const connection = new DataSource({
  type: 'postgres',
  host: POSTGRES.HOST,
  port: POSTGRES.PORT,
  username: POSTGRES.USER_NAME,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DATABASE,
  migrations: ['migrations/**/*.ts'],
  entities: ['src/domain/workout/entities/**/*.ts'],
  logging: ENV === 'development',
});

export async function connectDB() {
  const db = await connection.initialize();

  logger.info('[INFO]: PostgreSQL connection stablished');

  if (ENV !== 'test') {
    container.registerInstance('PostgresConnection', db);
  }
}
