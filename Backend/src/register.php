<?php
ob_start();
session_start();
require_once "utils/result.php";
require_once "utils/database.php";
require_once "utils/Profile.php";

if (isset($_SESSION["profile"])) {
    send_error("User already logged in", 302, "/index.html");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_POST["username"])) {
        send_error("Missing username field", 400);
    }
    if (!isset($_POST["password"])) {
        send_error("Missing password field", 400);
    }
    if (!isset($_POST["dob"])) {
        send_error("Missing date of birth field", 400);
    }

    $username = $_POST['username'];

    $query = "SELECT id FROM users WHERE username = :username";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':username', $username);

    $stmt->execute();
    if ($stmt->rowCount() != 0) {
        send_error("Username already taken", 400);
    }

    $password = $_POST['password'];
    $dob = DateTime::createFromFormat('Y-m-d', $_POST["dob"]);

    if ($dob === false) {
        send_error("Invalid date of birth format", 400);
    }

    if (empty($username) || empty($password) || empty($dob)) {
        send_error("Invalid fields", 400);
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into the database
    $query = "INSERT INTO users (username, password, dob) VALUES (:username, :password, :dob)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $hashedPassword);
    $format = $dob->format('Y-m-d');
    $stmt->bindParam(':dob', $format);

    if ($stmt->execute()) {
        $id = $conn->lastInsertId();
        if ($id === false) {
            send_error("Failed to insert user", 500);
        }
        $id = intval($id);
        $profile = new Profile($id, $username, $dob, null);
        $_SESSION["profile"] = $profile;
        send_success("User successfully registered", 302, "/index.html");
    } else {
        send_error("Failed to create user", 500);
    }
}