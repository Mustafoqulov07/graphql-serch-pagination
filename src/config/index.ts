import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT),
  DB_URL: String(process.env.DATABASE_URL),
};
