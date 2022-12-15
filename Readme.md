# Javascript assignment
A school assignment in which I had to create a website that connected with a database and an api using javascript.

## Prerequisites
- PHP 8.1
- MySQL 8
- Composer

## Getting started
Install dependencies:
```
composer install
```
```
vendor/bin/phinx init
```
Configure database in `config/dbinfo.php`, it should look like this:
```php
$host = '127.0.0.1';
$db   = 'scryfall'; // I named my database scryfall
$user = ''; //insert username
$pass = ''; // insert password
$charset = 'utf8mb4';
```

## Run migrations:
```
vendor/bin/phinx migrate
```
## Rollback migrations:
```
vendor/bin/phinx rollback -e development -t 0
```
<br />
Alternatively you can perform your own database import using the query in `scryfall.sql` make sure that your database is called 'scryfall'
<br />
<br />
<br />
<br />
