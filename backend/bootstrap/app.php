<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        apiPrefix: 'api/v1',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();

        // MUST be prependToGroup (outermost) so it runs AFTER EnsureFrontendRequestsAreStateful
        // (and its inner StartSession pipeline) has fully completed and added its cookies.
        // appendToGroup = innermost = runs BEFORE StartSession adds cookies = useless.
        // prependToGroup after statefulApi() = outermost = runs AFTER StartSession = correct.
        $middleware->prependToGroup('api', [
            \App\Http\Middleware\ClearSessionCookiesOnLogout::class,
        ]);

        $middleware->redirectGuestsTo(function (Request $request): ?string {
            if ($request->is('api/*') || $request->expectsJson()) {
                return null;
            }

            return null;
        });
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
