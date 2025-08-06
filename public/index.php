<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

file_put_contents(__DIR__ . '/../bootstrap/cache/debug.txt', "🟢 index.php start\n", FILE_APPEND);

define('LARAVEL_START', microtime(true));

// Maintenance check
file_put_contents(__DIR__ . '/../bootstrap/cache/debug.txt', "🟢 before maintenance check\n", FILE_APPEND);
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}
file_put_contents(__DIR__ . '/../bootstrap/cache/debug.txt', "🟢 after maintenance check\n", FILE_APPEND);

// Autoloader
require __DIR__.'/../vendor/autoload.php';
file_put_contents(__DIR__ . '/../bootstrap/cache/debug.txt', "🟢 autoload complete\n", FILE_APPEND);

// Bootstrap app
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';
file_put_contents(__DIR__ . '/../bootstrap/cache/debug.txt', "🟢 app bootstrap complete\n", FILE_APPEND);

// Handle request
$app->handleRequest(Request::capture());
file_put_contents(__DIR__ . '/../bootstrap/cache/debug.txt', "🟢 request handled\n", FILE_APPEND);
