<?php
// Database configuration
$host = 'localhost'; // Change if using a different host
$dbname = 'mbates5'; // Database name
$username = 'root'; // Database username
$password = ''; // Database password (update as necessary)

try {
    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    
    // Set error mode to exceptions
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
