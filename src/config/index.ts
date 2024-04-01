export interface AppConfig {
  port: number;
  apiKey: string;
  database: DbConfig;
}

export enum AppEnv {
  DEV = 'dev',
  TEST = 'test',
}

export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
}

export const getConfig = (): AppConfig => {
  return {
    port: parseInt(process.env.PORT as string, 10) || 3000,
    apiKey: process.env.API_KEY as string,
    database: {
      host: process.env.DB_HOST as string,
      port: parseInt(process.env.DB_PORT as string, 10) || 5432,
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      dbName: process.env.DB_NAME as string,
    },
  };
};
