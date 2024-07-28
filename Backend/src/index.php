<?php
session_start();
require_once "utils/result.php";
if (!isset($_SESSION['profile'])) {
    send_error("User not logged in", 302, "login.html");
}