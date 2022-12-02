<?php
namespace App;


class SQLiteInsertData {
	private $pdo;
	
	public function __construct($pdo) {
		$this->pdo = $pdo;
	}
	
	public function insertMessage($channelId, $message) {
		$sql = 'INSERT INTO Message(ChannelId, Message) VALUES(:channelId, :message)';
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':channelId', $channelId);
		$stmt->bindValue(':message', $message);
        $stmt->execute();

		$newMessageId = $this->pdo->lastInsertId();

        return $newMessageId;
	}

	public function insertChannel($channelName) {
		$stmt = $this->pdo->prepare('INSERT INTO Channel(Name) VALUES (:channelName)');
		$stmt->bindValue(':channelName', $channelName);
		$stmt->execute();

        return $this->pdo->lastInsertId();
	}
}