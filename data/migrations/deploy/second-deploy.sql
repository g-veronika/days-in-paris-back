-- Deploy days_in_paris:second-deploy to pg

BEGIN;

ALTER TABLE user_info 
ADD COLUMN is_admin BOOLEAN DEFAULT false,
ADD CONSTRAINT constr_unique UNIQUE (pseudo, email);

ALTER TABLE activity
DROP COLUMN duration,
ADD COLUMN duration INT,
DROP COLUMN user_id,
ADD COLUMN user_info_id INT NOT NULL REFERENCES user_info(id);



COMMIT;
