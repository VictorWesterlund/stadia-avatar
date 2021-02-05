<?php

	require "../classes/Message.php";
	require "../classes/Gravatar.php";
	require "../classes/Database.php";

	$shared_secret = ""; // Key to update the database

	$request = json_decode(file_get_contents("php://input")) ?? error("400","Bad request");

	if(!$request->sharedSecret || $request->sharedSecret !== $shared_secret) {
		error("403","Invalid shared secret.");
	}

	$db = new StadiaAvatarDB();
	$gravatar = new Gravatar($request->payload);

	if(!$db->set_avatar($request->userID,$gravatar->hash)) {
		error("500","Something went wrong.");
	}

	echo "{\"status\":\"OK\"}";