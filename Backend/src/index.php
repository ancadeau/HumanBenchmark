<?php

// Start the session
session_start();

if (!isset($_SESSION['profile'])) {
    header("Location: login.php");
}
