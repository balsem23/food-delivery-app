<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;
use Illuminate\Filesystem\Filesystem;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // 🛠️ Fix: Bind 'files' manually in case any package calls app('files')
        $this->app->bind('files', function () {
            return new Filesystem();
        });
    }

    public function boot(): void
    {
        // ✅ Optional: force Reverb broadcasting
        // Config::set('broadcasting.default', 'reverb');
    }
}
