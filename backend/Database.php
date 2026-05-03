<?php
require __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
class Database
{
  private $host = "localhost";
  private $db_name = "electro_mart";
  private $username;
  private $password;
  private $conn;

  public function __construct()
  {
    $this->username = $_ENV['DB_USER_NAME'];
    $this->password = $_ENV['DB_USER_PASSWORD'];
  }

  public function getConnection()
  {
    if ($this->conn == null) {
      try {
        $this->conn = new PDO(
          "pgsql:host={$this->host};dbname={$this->db_name}",
          $this->username,
          $this->password
        );

        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
        die("Connection failed: " . $e->getMessage());
      }
    }

    return $this->conn;
  }
}
