<?php

	require "../classes/Message.php";
	require "../classes/Database.php";

	$user_id = $_GET["userID"] ?? error("400","No userID provided");

	$db = new StadiaAvatarDB();
	$avatar = $db->get_avatar($user_id);

	if(!$avatar) {
		error("200","No avatar was found for the supplied userID");
	}
	
	echo "{\"status\":\"OK\",\"avatar\":\"${avatar}\"}";