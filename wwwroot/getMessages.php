<?php
require './php/vendor/autoload.php';

use App\SQLiteConnection;
use App\SQLiteQueryData;

$pdo = (new SQLiteConnection())->connect();

$sqlLiteQuery = new SQLiteQueryData($pdo);

$channelId = $_POST['channelId'];

// Build response string

function implode_Rec($sep, $arr) {
    for ($i=0; $i<count($arr); $i++) {
        if (@is_array($arr[$i])) {
            $arr[$i] = implode_rec($sep, $arr[$i]);
        }
    }
    return implode($sep, $arr);
}

echo json_encode($sqlLiteQuery->getMessagesByChannelId($channelId));