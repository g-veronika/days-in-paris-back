-- Deploy days_in_paris:dip3 to pg

BEGIN;

ALTER TABLE user_info
RENAME COLUMN pseudo TO name;

ALTER TABLE user_info
ADD COLUMN lastname VARCHAR(32) NOT NULL;

ALTER TABLE activity
ALTER COLUMN duration TYPE TEXT;

COMMIT;
