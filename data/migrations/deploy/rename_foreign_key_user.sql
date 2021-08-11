-- Deploy days_in_paris:rename_foreign_key_user to pg

BEGIN;

ALTER TABLE activity
DROP COLUMN user_info_id,
ADD COLUMN user_id INT NOT NULL REFERENCES "user"(id);

COMMIT;
