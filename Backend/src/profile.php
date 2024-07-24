<?php
ob_start();
session_start();
if (!isset($_SESSION['profile'])) {
    send_error("User already logged in", 302, "login.php");
} else {
    include_once "html/profile.html";
}
ob_end_flush();