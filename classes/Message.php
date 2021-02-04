<?php

	header("Content-Type: application/json");

	function error($code,$message) {
		http_response_code($code);
		die("{\"status\":\"error\",\"code\":\"${code}\",\"message\":\"${message}\"}");
	}