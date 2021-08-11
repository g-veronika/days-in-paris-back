-- Revert days_in_paris:dip3 from pg

BEGIN;

ALTER TABLE user_info
DROP COLUMN lastname,
RENAME COLUMN name TO pseudo;

ALTER TABLE activity
ALTER COLUMN duration TYPE TIMESTAMPTZ;


COMMIT;
