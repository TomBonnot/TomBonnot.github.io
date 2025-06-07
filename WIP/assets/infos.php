<?php
// Dossier d'enregistrement
$logFile = __DIR__ . '/visits.log';

// Données minimales
$data = [
    'timestamp' => date('d-m-Y s:i:H'),
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
];

// Enregistrement
file_put_contents($logFile, json_encode($data) . PHP_EOL, FILE_APPEND);

// Réponse neutre
http_response_code(204);