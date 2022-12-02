<?php
require './php/vendor/autoload.php';

use App\SQLiteConnection;
use App\SQLiteQueryData;

$pdo = (new SQLiteConnection())->connect();

$sqlLiteQuery = new SQLiteQueryData($pdo);

$channelName = $_POST['channelName'];

echo $sqlLiteQuery->getChannelId($channelName);