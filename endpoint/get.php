<?php

	require "../classes/Message.php";
	require "../classes/Database.php";

	$user_id = $_GET["userID"] ?? error("400","No userID provided");

	$db = new DBConnector();
	$avatar = $db->get_avatar($user_id);

	if($avatar) {
		echo "{\"status\":\"OK\",\"avatar\":\"${avatar}\"}";
		return;
	}

	error("404","No avatar was found for the supplied userID");