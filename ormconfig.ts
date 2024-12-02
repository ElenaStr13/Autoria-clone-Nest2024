import * as path from 'node:path';
import * as process from 'node:process';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import getter from './src/configs/configuration';

dotenv.config({ path: './environments/local.env' });

const PostgresConfig = getter().database;

export default new DataSource({
  type: 'postgres',
  host: PostgresConfig.host,
  port: PostgresConfig.port,
  username: PostgresConfig.user,
  password: PostgresConfig.password,
  database: PostgresConfig.name,
  entities: [
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize: false,
});
