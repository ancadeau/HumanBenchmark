<?php
function send_success(mixed $value, int $code, string $redirect = null)
{
    header('Content-type: application/json');
    if ($redirect !== null) {
        header('Location: ' . $redirect);
        die($code);
    }
    http_response_code($code);
    echo json_encode([
        "value" => $value,
    ]);
    die();
}
function send_error(string $message, int $code, string $redirect = null)
{
    header('Content-type: application/json');
    if ($redirect !== null) {
        header('Location: ' . $redirect);
    }
    http_response_code($code);
    echo json_encode([
        "error" => $message,
    ]);
    die();
}
?>