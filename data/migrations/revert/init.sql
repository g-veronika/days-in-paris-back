-- Revert days_in_paris:init from pg

BEGIN;

DROP TABLE activity;
DROP TABLE user_info;


COMMIT;
