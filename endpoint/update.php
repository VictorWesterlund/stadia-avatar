<?php

	require "../classes/Message.php";
	require "../classes/Database.php";

	$sharedSecret = ""; // Key to update the database

	if($sharedSecret !== "") {
		error("403","Invalid shared secret.");
	}

	$db = new DBConnector();

	if(!$db->set_avatar("foo","bario")) {
		error("500","Something went wrong.");
	}
	
	echo "{\"status\":\"OK\"}";