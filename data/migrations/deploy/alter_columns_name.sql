-- Deploy days_in_paris:alter_columns_name to pg

BEGIN;

ALTER TABLE user_info
RENAME TO "user";

ALTER TABLE "user"
RENAME COLUMN name TO first_name;

ALTER TABLE "user"
RENAME COLUMN lastname TO last_name;

ALTER Table "user"
RENAME COLUMN psw TO password;

COMMIT;
