<?php

// Start the session
session_start();
ob_start();

if (!isset($_SESSION['profile'])) {
    header("Location: login.php");
    http_response_code(301);
} else {
    include_once "html/index.html";
}