<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_POST["username"])) {
        echo "Missing username field";
        http_response_code(201);

    }
    if (!isset($_POST["password"])) {
        echo "Missing password field";
        http_response_code(201);

    }
    if (!isset($_POST["dob"])) {
        echo "Missing dob field";
        http_response_code(201);

    }

    $username = $_POST['username'];

    $query = "SELECT id FROM users WHERE username = :username";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':username', $username);

    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        echo "Username already exists";
        http_response_code(201);

    }

    $password = $_POST['password'];
    $dob = DateTime::createFromFormat('F d, Y', $_POST['dob']);

    if ($dob === false) {
        echo "Invalid date of birth format";
        http_response_code(201);

    }

    if (empty($username) || empty($password) || empty($dob)) {
        echo "Invalid fields";
        http_response_code(201);

    }

    require_once "database.php";

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into the database
    $query = "INSERT INTO users (username, password, dob) VALUES (:username, :password, :dob)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':dob', $dob);

    if ($stmt->execute()) {
        $id = $conn->lastInsertId();
        if ($id === false) {
            echo "Insertion failed";
            http_response_code(201);

        }
        $id = intval($id);
        $profile = new Profile($id, $username, $dob, null);
        $_SESSION["profile"] = $profile;
        echo "Registration successful!";
        http_response_code(201);
        header("Location: index.php");
    } else {
        echo $stmt->errorInfo()[2];
        http_response_code(201);

    }
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    include_once "html/register.html";
}