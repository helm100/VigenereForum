#!/bin/sh

cd wwwroot/db
DATABASE=VigenereForum.db
if [ ! -f "$DATABASE" ]; then
    echo "Creating a new, clean database $DATABASE."
    sqlite3 $DATABASE <<EOF
        CREATE TABLE "Channel" ( "Id"	INTEGER, "Name"	TEXT NOT NULL COLLATE NOCASE, PRIMARY KEY("Id"));
        CREATE TABLE Message ( Id INTEGER PRIMARY KEY, ChannelId INTEGER NOT NULL, Message TEXT NOT NULL, CONSTRAINT FK_Message_Channel FOREIGN KEY (ChannelId) REFERENCES Channel(Id));
EOF
fi
cd ../..

echo 'Composing PHP files...'
cd wwwroot/php
php composer.phar dump-autoload
cd ../..

echo 'Bundling JavaScript files...'
cd js
if [ "$1" = "build" ]; then
    rm ../wwwroot/bundle.j*
    npm run build
else
    npm run debug
fi
cd ..


echo 'Starting server...'
cd wwwroot
php -S localhost:4444
