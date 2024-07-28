<?php
session_start();
require_once "utils/result.php";
if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_SESSION["profile"])) {
    send_error("User already logged in", 307, "index.php");
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_POST["username"])) {
        send_error("Missing username field", 400);
    }
    if (!isset($_POST["password"])) {
        send_error("Missing password field", 400);
    }

    require_once "utils/database.php";

    $username = $_POST["username"];
    $password = $_POST["password"];

    // Validate login credentials
    $query = "SELECT * FROM users WHERE username = :username";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':username', $username);

    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $hashedPassword = $row['password'];

        if (password_verify($password, $hashedPassword)) {
            $dob = DateTime::createFromFormat('Y-m-d', $row["dob"]);

            require_once "utils/Profile.php";

            $profile = new Profile($row['id'], $username, $dob, $row["best_run"]);
            $_SESSION['profile'] = $profile;

            send_success("Login successful", 200);
        } else {
            send_error("Invalid password", 401);
        }
    } else {
        send_error("Username not found", 401);
    }
}