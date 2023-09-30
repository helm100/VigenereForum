<?php
require './php/vendor/autoload.php';

use App\SQLiteConnection;
use App\SQLiteQueryData;

$pdo = (new SQLiteConnection())->connect();

$sqlLiteQuery = new SQLiteQueryData($pdo);

$password = $_POST['password'];

// Build response string
echo json_encode($sqlLiteQuery->getUsageInfo($password));