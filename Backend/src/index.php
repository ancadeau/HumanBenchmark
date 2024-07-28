<?php
session_start();
require_once "utils/result.php";
if ($_SERVER['REQUEST_METHOD'] == 'GET' && !isset($_SESSION["profile"])) {
    send_error("User not logged in", 307, "index.php");
}