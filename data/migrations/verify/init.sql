-- Verify days_in_paris:init on pg

BEGIN;

SELECT * FROM activity WHERE false;
SELECT * FROM user_info WHERE false;


ROLLBACK;
