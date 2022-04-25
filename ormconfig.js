const connection = process.env.DB_TYPE;

const database = process.env.DB_NAME;

const environment = process.env.NODE_ENV;
const dbConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities:
    environment === 'test'
      ? [`src/domain/models/**/*.ts`]
      : [`dist/domain/models/**/*.js`],
  database:
    environment === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  migrationsRun: environment === 'test',
  dropSchema: environment === 'test',
  connectTimeoutMS: environment === 'test' ? 6000 : 0,
};

module.exports = [
  {
    ...dbConfig,
    logging: true,
    logger: 'file',
    migrationsTableName: 'migrations',
    migrations: ['dist/infrastructure/database/migrations/*.js'],
    cli: {
      migrationsDir: 'src/infrastructure/database/migrations',
    },
  },
  {
    name: 'seed',
    ...dbConfig,
    migrationsTableName: 'seeds',
    migrations: ['dist/infrastructure/database/seeds/*.js'],
    cli: {
      migrationsDir: 'src/infrastructure/database/seeds',
    },
  },
];
