<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Database extends AbstractMigration
{
    public function up() {
        $sql_statement = file_get_contents("scryfall.sql");
        $this->execute($sql_statement);

    }
    public function down() {
        $this->execute("
            DROP TABLE `all_cards`;
        ");
    }
}