BEGIN;
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
  id serial PRIMARY KEY, actor_email text NOT NULL, action text NOT NULL,
  entity_type text NOT NULL, entity_id text NOT NULL DEFAULT '',
  created_at timestamp without time zone NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS submissions_status_idx ON submissions(status);
CREATE INDEX IF NOT EXISTS submissions_created_at_idx ON submissions(created_at DESC);
COMMIT;
