#!/bin/bash
# Grant the app user access to the ordbok database.
# Docker's MYSQL_DATABASE only auto-grants on the single database it creates (turbin).
mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<-EOSQL
    GRANT ALL PRIVILEGES ON ordbok.* TO '$MYSQL_USER'@'%';
    FLUSH PRIVILEGES;
EOSQL
