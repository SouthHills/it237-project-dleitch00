#!/bin/bash

/opt/mssql/bin/sqlservr &

until /opt/mssql-tools18/bin/sqlcmd -C -S "$DB_HOST" -U "$DB_USER" -P "$SA_PASSWORD"  -Q "SELECT 1"; 
do
    sleep 2
done

/opt/mssql-tools18/bin/sqlcmd -C -S "$DB_HOST" -U "$DB_USER" -P "$SA_PASSWORD" -d "$DB_NAME" -i /dockerfilestorage/createDatabase.sql

wait

