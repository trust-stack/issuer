import { drizzle } from 'drizzle-orm/d1';

export const getDb = () => {
  return drizzle(process.env.DATABASE_URL);
};
