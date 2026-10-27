<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;

/**
 * Runs AFTER StartSession middleware in the pipeline.
 *
 * Problem: StartSession always re-issues a new guest laravel_session cookie
 * on every response — even the logout response — overriding our cookie()->forget().
 *
 * Solution: After the full pipeline (including StartSession) resolves,
 * we intercept the response and strip + re-expire both session cookies.
 */
final class ClearSessionCookiesOnLogout
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Response $response */
        $response = $next($request); // StartSession has already run by this point.

        // Only act on the logout endpoint.
        if (! $request->is('api/v1/auth/logout')) {
            return $response;
        }

        $sessionCookieName = config('session.cookie');   // e.g. "laravel_session"
        $cookiesToClear    = [$sessionCookieName, 'XSRF-TOKEN'];

        // Step 1 — Remove every Set-Cookie header StartSession already wrote for these cookies.
        foreach ($response->headers->getCookies() as $cookie) {
            if (in_array($cookie->getName(), $cookiesToClear, strict: true)) {
                $response->headers->removeCookie(
                    $cookie->getName(),
                    $cookie->getPath(),
                    $cookie->getDomain(),
                );
            }
        }

        // Step 2 — Re-add expired versions so the browser deletes its stored copies.
        $domain   = config('session.domain') ?: null;
        $sameSite = config('session.same_site', 'lax');

        $response->headers->setCookie(
            Cookie::create($sessionCookieName)
                ->withValue('')
                ->withExpires(1)            // Jan 1, 1970 → forces deletion
                ->withPath('/')
                ->withDomain($domain)
                ->withHttpOnly(true)
                ->withSameSite($sameSite),
        );

        $response->headers->setCookie(
            Cookie::create('XSRF-TOKEN')
                ->withValue('')
                ->withExpires(1)
                ->withPath('/')
                ->withDomain($domain)
                ->withHttpOnly(false)       // XSRF-TOKEN is JS-readable
                ->withSameSite($sameSite),
        );

        return $response;
    }
}
