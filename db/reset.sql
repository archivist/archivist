-- Reset database:

drop table if exists "snapshots";
drop table if exists "changes";
drop table if exists "fragments";
drop table if exists "documents";
drop table if exists "sessions";
drop table if exists "users";
drop function if exists documents_search_trigger();
drop function if exists fragments_search_trigger();

-- Users:
CREATE TABLE "users" (
  "userId" text UNIQUE PRIMARY KEY,
  email text UNIQUE,
  name text,
  created timestamp,
  "loginKey" text UNIQUE
);

CREATE UNIQUE INDEX login_key_index ON users("loginKey");

-- Sessions:
CREATE TABLE "sessions" (
  "sessionToken" text UNIQUE PRIMARY KEY,
  "userId" text REFERENCES users ON DELETE CASCADE,
  -- ex timestamp
  created timestamp
);

-- Documents:
CREATE TABLE "documents" (
  "documentId" text UNIQUE PRIMARY KEY,
  "schemaName" text,
  "schemaVersion" text,
  info jsonb,
  meta jsonb,
  version integer,
  "indexedVersion" integer,
  title text,
  language text,
  annotations text[],
  "fullText" text,
  "updatedAt" timestamp,
  "updatedBy" text REFERENCES users ON DELETE SET DEFAULT,
  "userId" text REFERENCES users ON DELETE SET DEFAULT,
  -- fts
  tsv tsvector
);

CREATE UNIQUE INDEX document_id_index ON documents("documentId");

-- Documents search index
CREATE INDEX tsv_documents_idx ON documents USING gin(tsv);

CREATE FUNCTION documents_search_trigger() RETURNS trigger AS $$
begin
  new.tsv :=
    setweight(to_tsvector('russian', COALESCE(new.title,'')), 'A') || 
    setweight(to_tsvector('russian', COALESCE(new.meta->>'summary','')),'B') ||
    setweight(to_tsvector('russian', COALESCE(new."fullText",'')),'C');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectordocumentsupdate BEFORE INSERT OR UPDATE
ON documents FOR EACH ROW EXECUTE PROCEDURE documents_search_trigger();

-- Changes:
CREATE TABLE "changes" (
  "documentId" text REFERENCES documents ON DELETE CASCADE,
  version integer,
  data jsonb,
  "createdAt" timestamp,
  "userId" text REFERENCES users ON DELETE SET DEFAULT,
  PRIMARY KEY("documentId", version)
);

-- Index so we can query by documentId and or userId (needed to extract collaborators)
CREATE INDEX changes_document_id_index ON changes("documentId");
CREATE INDEX changes_user_id_index ON changes("userId");
CREATE INDEX changes_document_user_idx_index ON changes("documentId", "userId");

-- Snapshots:
CREATE TABLE "snapshots" (
  "documentId" text REFERENCES documents ON DELETE CASCADE,
  version integer,
  data jsonb,
  created timestamp,
  PRIMARY KEY("documentId", version)
);

-- Fragments:
CREATE TABLE "fragments" (
  "fragmentId" text,
  "documentId" text REFERENCES documents ON DELETE CASCADE,
  -- plain text version
  content text,
  -- xml version
  markup text,
  -- array with annotations references
  annotations text[],
  -- previous fragment reference
  prev text,
  -- next fragment reference
  next text,
  -- fts
  tsv tsvector,
  PRIMARY KEY("fragmentId", "documentId")
);

CREATE INDEX tsv_fragments_idx ON fragments USING gin(tsv);

CREATE FUNCTION fragments_search_trigger() RETURNS trigger AS $$
begin
  new.tsv :=
    setweight(to_tsvector('russian', COALESCE(new.content,'')), 'C');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorfragmentsupdate BEFORE INSERT OR UPDATE
ON fragments FOR EACH ROW EXECUTE PROCEDURE fragments_search_trigger();