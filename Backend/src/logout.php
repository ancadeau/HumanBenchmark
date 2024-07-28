<?php
session_start();
require_once "utils/result.php";
if (isset($_SESSION["profile"])) {
    unset($_SESSION["profile"]);
    send_error("Logged out", 200, "index.html");
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    header('Location: ' . $BASE_URL . 'index.html');
    http_response_code(302);
}