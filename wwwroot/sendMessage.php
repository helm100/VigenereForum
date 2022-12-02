<?php
require './php/vendor/autoload.php';

use App\SQLiteConnection;
use App\SQLiteInsertData;

$pdo = (new SQLiteConnection())->connect();

$sqlLiteInsert = new SQLiteInsertData($pdo);

$channelId = $_POST['channelId'];
$message = $_POST['message'];

echo $sqlLiteInsert->insertMessage($channelId, $message);