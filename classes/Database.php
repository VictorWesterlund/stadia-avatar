<?php

	class DBConnector extends mysqli {

		public static $config = [
			"host" => "",
			"username" => "",
			"password" => "",
			"database" => "stadia_avatars"
		];

		public function __construct() {
			parent::init();

			if(!parent::options(MYSQLI_INIT_COMMAND,"SET AUTOCOMMIT = 0")) {
				die("Setting MYSQLI_INIT_COMMAND failed");
			}
	
			if(!parent::options(MYSQLI_OPT_CONNECT_TIMEOUT,5)) {
				die("Setting MYSQLI_OPT_CONNECT_TIMEOUT failed");
			}
	
			if(!parent::real_connect(DBConnector::$config["host"],DBConnector::$config["username"],DBConnector::$config["password"],DBConnector::$config["database"])) {
				die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
			}
		}

		private function check_connection() {
			if(parent::connect_errno) {
				die("Invalid connection");
			}
		}

		private function insert_avatar($user_id,$value) {
			$time = time();
			$query = "INSERT INTO avatars (userid, avatar, modified) VALUES ('${user_id}', '${value}', '${time}');";

			if($result = parent::query($query) === true) {
				http_response_code("206");
				return true;
			}

			return false;
		}

		private function update_avatar($user_id,$value) {
			$time = time();
			$query = "UPDATE avatars SET avatar = '${value}', modified = '${time}' WHERE avatars.userid = '${user_id}';";

			if($result = parent::query($query) === true) {
				return true;
			}

			return false;
		}

		// ----

		public function get_avatar($user_id) {
			$query = "SELECT userid, avatar FROM avatars WHERE userid = '${user_id}';";

			if($result = parent::query($query)) {
				return $result->fetch_array(MYSQLI_NUM)[1];
			}

			return false;
		}

		public function set_avatar($user_id,$value) {
			if($this->get_avatar($user_id)) {
				return $this->update_avatar($user_id,$value);
			}

			return $this->insert_avatar($user_id,$value);
		}

	}