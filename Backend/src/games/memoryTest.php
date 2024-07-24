<?php

// Start the session
session_start();

if (!isset($_SESSION['profile'])) {
    header("Location: login.php");
    http_response_code(401);
} else {
    include_once "html/games/memoryTest.html";
}