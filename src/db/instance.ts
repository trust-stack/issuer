import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const getDb = () => {
  return drizzle(process.env.DATABASE_URL, { schema });
};
