-- Revert days_in_paris:second-deploy from pg

BEGIN;

ALTER TABLE user_info 
DROP COLUMN is_admin,
DROP CONSTRAINT constr_unique;

ALTER TABLE activity
DROP COLUMN duration,
ADD COLUMN duration TIME;

COMMIT;
