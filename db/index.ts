import "server-only";
import { Pool, type QueryResultRow } from "pg";

declare global {
  var oceanbrownPool: Pool | undefined;
  var oceanbrownSchemaReady: Promise<void> | undefined;
}

function pool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  global.oceanbrownPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 10, idleTimeoutMillis: 30_000, connectionTimeoutMillis: 5_000 });
  return global.oceanbrownPool;
}

async function initialiseSchema() {
  await pool().query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id serial PRIMARY KEY,
      business_name text NOT NULL, owner_name text NOT NULL, phone_number text NOT NULL,
      email_address text NOT NULL, location text NOT NULL, business_type text NOT NULL,
      services jsonb NOT NULL, improvement_areas text NOT NULL, current_software text,
      employee_count text NOT NULL, biggest_challenge text NOT NULL, start_timeline text NOT NULL,
      budget_range text, additional_details text, communication_method text NOT NULL,
      additional_notes text, file_name text, consent boolean NOT NULL,
      created_at timestamp without time zone NOT NULL DEFAULT now()
    );
    ALTER TABLE submissions ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';
    ALTER TABLE submissions ADD COLUMN IF NOT EXISTS updated_at timestamp without time zone NOT NULL DEFAULT now();
    CREATE TABLE IF NOT EXISTS inquiries (
      id serial PRIMARY KEY, kind text NOT NULL DEFAULT 'contact', name text NOT NULL,
      contact text NOT NULL, service text NOT NULL DEFAULT '', message text NOT NULL,
      status text NOT NULL DEFAULT 'new', submission_id integer REFERENCES submissions(id) ON DELETE SET NULL,
      created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS content_items (
      id serial PRIMARY KEY, module text NOT NULL, title text NOT NULL, slug text NOT NULL UNIQUE,
      summary text NOT NULL DEFAULT '', body text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'draft',
      sort_order integer NOT NULL DEFAULT 0, publish_at timestamp without time zone,
      seo_title text NOT NULL DEFAULT '', seo_description text NOT NULL DEFAULT '',
      created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS activity_log (
      id serial PRIMARY KEY, actor_email text NOT NULL, action text NOT NULL, entity_type text NOT NULL,
      entity_id text NOT NULL DEFAULT '', created_at timestamp without time zone NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status);
    CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at DESC);
    CREATE INDEX IF NOT EXISTS submissions_status_idx ON submissions(status);
    CREATE INDEX IF NOT EXISTS submissions_created_at_idx ON submissions(created_at DESC);
  `);
}

export async function ensureSchema() {
  global.oceanbrownSchemaReady ??= initialiseSchema().catch((error) => { global.oceanbrownSchemaReady = undefined; throw error; });
  return global.oceanbrownSchemaReady;
}

export async function query<T extends QueryResultRow>(text: string, values: unknown[] = []) {
  await ensureSchema();
  return pool().query<T>(text, values);
}

export async function transaction<T>(run: (client: import("pg").PoolClient) => Promise<T>) {
  await ensureSchema();
  const client = await pool().connect();
  try { await client.query("BEGIN"); const result = await run(client); await client.query("COMMIT"); return result; }
  catch (error) { await client.query("ROLLBACK"); throw error; }
  finally { client.release(); }
}
