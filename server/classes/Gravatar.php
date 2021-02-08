<?php

	class Gravatar {

		public function __construct($email) {
			$this->hash = md5(strtolower(trim($email)));
		}

	}