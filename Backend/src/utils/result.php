<?php

function send_success(mixed $value, int $code, string $redirect = null)
{
    http_response_code($code);
    if ($redirect) {
        header('Location: ' . $redirect);
    }
    exit(json_encode([
        "value" => $value,
    ]));
}


function send_error(string $message, int $code, string $redirect = null)
{
    http_response_code($code);
    if ($redirect) {
        header('Location: ' . $redirect);
    }
    exit(json_encode([
        "error" => $message,
    ]));
}