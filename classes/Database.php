<?php

	class DBConnector extends mysqli {

		protected static $config = [
			"host" => "",
			"username" => "",
			"password" => "",
			"database" => "stadia_avatars"
		];

		protected static $instance;

		private function __construct() {
			$config = self::$config;

			@parent::__construct($config["host"],$config["username"],$config["password"],$config["database"]);

			if(mysqli_connect_error()) {
				throw new Exception(mysqli_connect_error(),mysqli_connect_errno());
			}
		}

		public static function getInstance() {
			if(!self::$instance) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		public function exec_query($query) {
			if(!$this->real_query($query)) {
				throw new Exception($this->error,$this->errno);
			}

			$result = new mysqli_result($this);
			return $result;
		}

		public function prepare($query) {
			$stmt = new mysqli_stmt($this,$query);
			return $stmt;
		}

	}

	class StadiaAvatarDB extends DBConnector {

		public function __construct() {
			$this->sql = DBConnector::getInstance();
		}

		private function insert_avatar($user_id,$avatar) {
			$time = time();

			$SQL = "INSERT INTO `avatars` (`userid`, `avatar`, `modified`) VALUES ('${user_id}', '${avatar}', '${time}');";
			return $this->sql->exec_query($SQL);
		}

		private function update_avatar($user_id,$avatar) {
			$time = time();

			$SQL = "UPDATE `avatars` SET `avatar` = '${avatar}', `modified` = '${time}' WHERE `avatars`.`userid` = '${user_id}';";
			return $this->sql->exec_query($SQL);
		}

		public function get_avatar($user_id) {
			$SQL = "SELECT `userid`, `avatar` FROM `avatars` WHERE `userid` = '${user_id}'";
			$query = $this->sql->exec_query($SQL);

			while($row = $query->fetch_assoc()) {
				return $row["avatar"];
			}
		}

		public function set_avatar($user_id,$avatar) {
			if(!$this->get_avatar($user_id)) {
				http_response_code("201");
				return $this->insert_avatar($user_id,$avatar);
			}

			return $this->update_avatar($user_id,$avatar);
		}

	}