<?php

class Model
{
    public static $mysqli;

    public function __construct() {
        $this->mysqli = new mysqli("localhost", "root", "root", "editor");
    }
}