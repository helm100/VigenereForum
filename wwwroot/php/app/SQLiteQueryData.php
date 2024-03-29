<?php
namespace App;


class SQLiteQueryData {
	
	private $pdo;
	
	public function __construct($pdo) {
		$this->pdo = $pdo;
	}
	
	public function getMessages() {
		$stmt = $this->pdo->query('SELECT Id,ChannelId,Message FROM Message');
		$messages = [];
		while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
			$messages[] = [
				$row['Id'],
				$row['Message'],
				$row['ChannelId']
			];
		}
			
		return $messages;
	}

	public function getMessagesByChannelId($channelId) {
		$stmt = $this->pdo->prepare('SELECT Id,ChannelId,Message FROM Message WHERE ChannelId = :channelId');
		$stmt->execute([':channelId' => $channelId]);
		$messages = [];
		while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
			$messages[] = [
				$row['Id'],
				$row['Message']
			];
		}
			
		return $messages;
	}

	public function getChannelId($channelName) {
		$stmt = $this->pdo->prepare('SELECT Id FROM Channel WHERE Name = :channelName LIMIT 1');
		$stmt->execute([':channelName' => $channelName]);

		$channelId = $stmt->fetchColumn();

		if(!empty($channelId)) {
			return $channelId;
		}

		$sqliteInsert = new SQLiteInsertData($this->pdo);

		$channelId = $sqliteInsert->insertChannel($channelName);
		return $channelId;
	}

	public function getUsageInfo($password) {
		if($password != 'hiV1g!') {
			return 'Incorrect password';
		}

		$stmt = $this->pdo->prepare('SELECT COUNT(Message.Message) AS [MessageCount], Channel.[Name] FROM Message INNER JOIN Channel ON Channel.Id = Message.ChannelId GROUP BY ChannelId');
		$stmt->execute();
		$usage = [];
		while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
			$usage[] = [
				$row['Name'],
				$row['MessageCount']
			];
		}
			
		return $usage;
	}
}