<?php
file_put_contents(__DIR__ . '/../bootstrap/cache/debug.txt', "✅ test log\n", FILE_APPEND);
echo "Log written";
