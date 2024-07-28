<?php

$BASE_URL = "/wdp/Group3/";

function send_success(mixed $value, int $code, string $redirect = null)
{
    // Ensure no previous output has been sent
    global $BASE_URL;
    if (headers_sent()) {
        throw new Exception("Headers already sent");
    }

    header('Content-type: application/json');
    http_response_code($code);
    if ($redirect !== null) {
        header('Location: ' . $BASE_URL . $redirect);
    }
    echo json_encode([
        "value" => $value,
    ]);
    die();
}

function send_error(string $message, int $code, string $redirect = null)
{
    global $BASE_URL;
    // Ensure no previous output has been sent
    if (headers_sent()) {
        throw new Exception("Headers already sent");
    }

    header('Content-type: application/json');

    http_response_code($code);
    if ($redirect !== null) {
        header('Location: ' . $BASE_URL . $redirect);
    }
    echo json_encode([
        "error" => $message,
    ]);
    die();
}
?>