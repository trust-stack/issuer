import { eq } from 'drizzle-orm';
import { credentials } from 'src/db/schema';

/**
 * Registers the public credential fetching route on the app
 * @param app - Hono app instance
 * @param credentialsRepository - Credentials repository (used to access db and storage)
 */
export function registerPublicCredentialRoute(app: any, credentialsRepository: any): void {
  const db = credentialsRepository.db;
  const r2Repository = credentialsRepository.r2;

  app.get('/credentials/:id', async (c: any) => {
    const { id } = c.req.param();

    if (!db) {
      return c.json({ error: 'Database not available' }, 500);
    }

    try {
      // Find credential by ID (without organization filter for public access)
      const [credentialRecord] = await db
        .select()
        .from(credentials)
        .where(eq(credentials.id, id))
        .limit(1);

      if (!credentialRecord) {
        return c.json({ error: 'Credential not found' }, 404);
      }

      // Get raw credential from storage
      // For Cloudflare, this would be R2, for SQLite it's in the DB
      if (r2Repository) {
        const rawCredential = await r2Repository.getCredential(credentialRecord.hash);
        return c.json(rawCredential, 200);
      }

      // Fallback to DB storage if R2 not available
      return c.json(credentialRecord.raw, 200);
    } catch (error: any) {
      console.error('Failed to fetch credential', error);
      return c.json({ error: 'Failed to fetch credential' }, 500);
    }
  });
}
