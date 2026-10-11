# HTTP Status Codes: Complete Reference

For every code: **Meaning** (what it says), **When to use** (the situation), **Why** (the reason it exists / what the client should do).

---

## Quick Overview

| Range | Class | Idea in one line |
|-------|-------|------------------|
| 1xx | Informational | "Request received, keep going." |
| 2xx | Success | "It worked." |
| 3xx | Redirection | "Go somewhere else / use your cache." |
| 4xx | Client Error | "You (the client) did something wrong." |
| 5xx | Server Error | "I (the server) failed." |

**Rule of thumb for API design:** if the caller can fix it by changing the request → 4xx. If only the server owner can fix it → 5xx.

---

# 1xx: Informational

These are interim responses. The final response comes later. You rarely set them by hand.

### 100 Continue
- **Meaning:** The initial part of the request was accepted; the client should continue sending the body.
- **When to use:** Client sent `Expect: 100-continue` (usually before uploading a big body) and the server is OK with the headers.
- **Why:** Avoids wasting bandwidth uploading a huge body that would be rejected anyway (bad auth, too large).

### 101 Switching Protocols
- **Meaning:** The server agrees to change the protocol on this connection.
- **When to use:** Upgrading HTTP to WebSocket (`Upgrade: websocket`) or to HTTP/2 over cleartext.
- **Why:** Lets one connection start as HTTP and then become a different protocol.

### 102 Processing (WebDAV)
- **Meaning:** The server is still working on a long request; no final response yet.
- **When to use:** Long WebDAV operations that could otherwise make the client time out.
- **Why:** Keeps the client from assuming the request was lost.

### 103 Early Hints
- **Meaning:** Preliminary headers (usually `Link`) sent before the final response.
- **When to use:** The server needs time to build the page but already knows which CSS/JS/fonts will be needed.
- **Why:** The browser can start preloading resources while the server is still thinking, improving page speed.

---

# 2xx: Success

### 200 OK
- **Meaning:** The request succeeded; the response contains the result.
- **When to use:** Default for successful `GET`, `PUT`, `PATCH`, `POST` (when not creating something) and `DELETE` (when returning a body).
- **Why:** The standard "everything is fine" signal.

### 201 Created
- **Meaning:** The request succeeded and a new resource was created.
- **When to use:** After a `POST` (or `PUT`) that creates a record, e.g. new user, new order. Include a `Location` header pointing to the new resource.
- **Why:** Tells the client that something new now exists and where to find it, which is more precise than 200.

### 202 Accepted
- **Meaning:** The request was accepted for processing, but processing isn't finished.
- **When to use:** Async jobs: video encoding, report generation, email queues, background tasks. Return a job ID or status URL.
- **Why:** Honest signal that the work isn't done yet and the outcome is not guaranteed; the client should poll or wait for a callback.

### 203 Non-Authoritative Information
- **Meaning:** Success, but the content was modified by a proxy and may differ from the origin server's.
- **When to use:** A transforming proxy altered the response.
- **Why:** Lets clients know the data isn't exactly what the origin sent. Rare in practice.

### 204 No Content
- **Meaning:** Success, and there is intentionally no response body.
- **When to use:** Successful `DELETE`, or `PUT`/`PATCH` where you don't need to return the updated resource; CORS preflight (`OPTIONS`) responses.
- **Why:** Saves bandwidth and tells the client "done, nothing to show; don't navigate away or change the view".

### 205 Reset Content
- **Meaning:** Success; the client should reset the document view (e.g. clear a form).
- **When to use:** After a form submission where you want the form cleared for new input.
- **Why:** Prompts the UI to return to its initial state. Rarely used.

### 206 Partial Content
- **Meaning:** The server is returning only part of the resource, as requested by a `Range` header.
- **When to use:** Video/audio streaming, resumable downloads, large file chunks.
- **Why:** Lets clients seek in media and resume interrupted downloads without re-fetching everything.

### 207 Multi-Status (WebDAV)
- **Meaning:** The body contains multiple separate status codes for multiple sub-operations.
- **When to use:** Batch operations where some items succeed and others fail.
- **Why:** One overall code can't describe mixed results, so each item gets its own.

### 208 Already Reported (WebDAV)
- **Meaning:** Members of a binding were already listed earlier in the response; not repeated.
- **When to use:** WebDAV collection listings to avoid infinite loops/duplicates.
- **Why:** Prevents duplicate output. Very rare.

### 226 IM Used
- **Meaning:** The response is the result of one or more instance manipulations (delta encoding) applied to the resource.
- **When to use:** Delta encoding for `GET` requests.
- **Why:** Sends only the differences. Very rare.

---

# 3xx: Redirection

### 300 Multiple Choices
- **Meaning:** There are several possible representations; the client may choose one.
- **When to use:** A resource exists in multiple formats/languages and you want to list them.
- **Why:** Lets the user or client pick. Rarely used; content negotiation is more common.

### 301 Moved Permanently
- **Meaning:** The resource has permanently moved to a new URL (given in `Location`).
- **When to use:** Domain changes, HTTP → HTTPS, permanent URL restructures, canonical URL enforcement.
- **Why:** Browsers and search engines cache it and transfer SEO ranking to the new URL. Note: some clients change `POST` to `GET` on redirect.

### 302 Found (Temporary Redirect)
- **Meaning:** The resource is temporarily at a different URL.
- **When to use:** Temporary moves, login redirects, A/B tests, maintenance pages.
- **Why:** The original URL remains the "real" one, so search engines keep indexing it. Historically clients may switch `POST` to `GET`; prefer 303 or 307 for clarity.

### 303 See Other
- **Meaning:** The result of your request is at a different URL; fetch it with `GET`.
- **When to use:** After a `POST` (form submit), redirect to a result/confirmation page (Post/Redirect/Get pattern).
- **Why:** Prevents duplicate submissions when the user refreshes the page.

### 304 Not Modified
- **Meaning:** The resource hasn't changed since the client's cached version; no body is sent.
- **When to use:** Response to conditional requests (`If-None-Match` with ETag, or `If-Modified-Since`).
- **Why:** Saves bandwidth and speeds up loading by letting the client reuse its cache.

### 305 Use Proxy (deprecated)
- **Meaning:** The resource must be accessed through a specified proxy.
- **When to use:** Don't. Deprecated for security reasons.
- **Why:** Listed only for completeness.

### 306 (Unused)
- **Meaning:** Formerly "Switch Proxy". Reserved, no longer used.
- **When to use:** Never.

### 307 Temporary Redirect
- **Meaning:** Temporary redirect that **keeps the same HTTP method and body**.
- **When to use:** Temporary redirect of a `POST`/`PUT` where the method must not change to `GET`.
- **Why:** Strict, predictable version of 302.

### 308 Permanent Redirect
- **Meaning:** Permanent redirect that **keeps the same HTTP method and body**.
- **When to use:** Permanently moving an API endpoint that accepts `POST`/`PUT`.
- **Why:** Strict version of 301: same SEO/caching benefit without the method-changing risk.

---

# 4xx: Client Errors

### 400 Bad Request
- **Meaning:** The server can't understand the request because of malformed syntax or invalid data.
- **When to use:** Invalid JSON, missing required field, wrong data type, bad query parameter.
- **Why:** The client must fix the request before retrying. Return a helpful error message describing what's wrong.

### 401 Unauthorized
- **Meaning:** Authentication is required or failed. (Despite the name, it means *unauthenticated*.)
- **When to use:** Missing, expired or invalid token/password/API key. Include a `WWW-Authenticate` header.
- **Why:** Tells the client "prove who you are" and try again with valid credentials.

### 402 Payment Required
- **Meaning:** Reserved for digital payment systems; payment is needed.
- **When to use:** Some APIs use it for quota exceeded, subscription expired or billing failure.
- **Why:** Signals the issue is money-related, not permissions. Non-standardised, so document it if you use it.

### 403 Forbidden
- **Meaning:** The server understood the request and knows who you are, but refuses to allow it.
- **When to use:** Authenticated user lacks permission, IP is blocked, or the action is not allowed for their role.
- **Why:** Re-authenticating won't help. Difference from 401: 401 = "who are you?", 403 = "I know you, but no".

### 404 Not Found
- **Meaning:** The resource doesn't exist at this URL.
- **When to use:** Unknown route, record ID not found. Also sometimes used instead of 403 to hide that a resource exists.
- **Why:** Clear signal that the target isn't there (may or may not return later).

### 405 Method Not Allowed
- **Meaning:** The URL exists, but not for this HTTP method.
- **When to use:** `DELETE` on a read-only endpoint, `POST` on a route that only supports `GET`. Include an `Allow` header listing valid methods.
- **Why:** Tells the client which methods it *can* use.

### 406 Not Acceptable
- **Meaning:** The server can't produce a response matching the client's `Accept` headers.
- **When to use:** Client demands `application/xml` but you only serve JSON.
- **Why:** Content negotiation failed.

### 407 Proxy Authentication Required
- **Meaning:** Like 401, but authentication is needed with a proxy.
- **When to use:** Corporate/forward proxies requiring credentials.
- **Why:** Tells the client to authenticate with the proxy first.

### 408 Request Timeout
- **Meaning:** The server timed out waiting for the client to finish sending the request.
- **When to use:** The client opened a connection but was too slow or idle.
- **Why:** Frees server resources; client may retry.

### 409 Conflict
- **Meaning:** The request conflicts with the current state of the resource.
- **When to use:** Duplicate unique value (email already registered), edit conflicts (version mismatch), deleting something still in use.
- **Why:** The client can resolve the conflict (change data, refetch, merge) and retry.

### 410 Gone
- **Meaning:** The resource existed but was permanently removed, with no forwarding address.
- **When to use:** Deleted content you know will never return (expired offers, retired APIs).
- **Why:** Stronger than 404; search engines drop the URL faster.

### 411 Length Required
- **Meaning:** The server requires a `Content-Length` header.
- **When to use:** Endpoint refuses chunked/unknown-length bodies.
- **Why:** Needed to validate/allocate the body size.

### 412 Precondition Failed
- **Meaning:** A condition in the request headers (`If-Match`, `If-Unmodified-Since`) evaluated to false.
- **When to use:** Optimistic concurrency: client tries to update a resource whose ETag has changed.
- **Why:** Prevents overwriting someone else's changes (lost-update problem).

### 413 Content Too Large (Payload Too Large)
- **Meaning:** The request body exceeds server limits.
- **When to use:** File upload or JSON body too big.
- **Why:** Protects the server; may include `Retry-After` if the limit is temporary.

### 414 URI Too Long
- **Meaning:** The URL is longer than the server will accept.
- **When to use:** Giant query strings (e.g. thousands of IDs in a `GET`).
- **Why:** Signals the client should use `POST` with a body instead.

### 415 Unsupported Media Type
- **Meaning:** The request's `Content-Type` isn't supported.
- **When to use:** Client sends XML/text/form-data but the endpoint only accepts `application/json`.
- **Why:** Tells the client which formats are accepted.

### 416 Range Not Satisfiable
- **Meaning:** The requested `Range` is outside the resource's size.
- **When to use:** Client asks for bytes beyond the end of a file.
- **Why:** Include `Content-Range: bytes */<size>` so the client can correct itself.

### 417 Expectation Failed
- **Meaning:** The server can't meet the requirements of the `Expect` header.
- **When to use:** Unsupported `Expect` value.
- **Why:** Client should retry without the expectation.

### 418 I'm a Teapot
- **Meaning:** An April Fools' joke code (RFC 2324): "I'm a teapot and can't brew coffee."
- **When to use:** Easter eggs, or deliberately rejecting bots/scanners.
- **Why:** Humour; not for serious use.

### 421 Misdirected Request
- **Meaning:** The request was sent to a server that can't produce a response for that host.
- **When to use:** HTTP/2 connection reuse sent to the wrong virtual host.
- **Why:** Client should open a new connection to the right server.

### 422 Unprocessable Content (Unprocessable Entity)
- **Meaning:** The request is well-formed, but semantically invalid.
- **When to use:** Validation errors: JSON is valid but "age" is -5 or the email format is wrong. Very common in REST/GraphQL/Rails/FastAPI.
- **Why:** Distinguishes "can't parse it" (400) from "parsed it, but the values don't make sense" (422).

### 423 Locked (WebDAV)
- **Meaning:** The resource is locked.
- **When to use:** Another user/process holds a lock on the resource.
- **Why:** Prevents concurrent modification.

### 424 Failed Dependency (WebDAV)
- **Meaning:** The request failed because a previous request it depended on failed.
- **When to use:** Multi-step WebDAV operations.
- **Why:** Explains a cascade failure.

### 425 Too Early
- **Meaning:** The server is unwilling to process a request that might be replayed.
- **When to use:** TLS 1.3 early data (0-RTT) with non-idempotent requests.
- **Why:** Guards against replay attacks.

### 426 Upgrade Required
- **Meaning:** The client must switch to a different protocol (given in `Upgrade` header).
- **When to use:** Server requires TLS or a newer HTTP version.
- **Why:** Forces the client onto a supported protocol.

### 428 Precondition Required
- **Meaning:** The server requires the request to be conditional.
- **When to use:** Force clients to send `If-Match` on updates.
- **Why:** Prevents the lost-update problem.

### 429 Too Many Requests
- **Meaning:** The client sent too many requests in a given time (rate limiting).
- **When to use:** API rate limits, brute-force protection. Include a `Retry-After` header.
- **Why:** Protects the service from abuse and overload and tells the client when to retry.

### 431 Request Header Fields Too Large
- **Meaning:** The headers (or one header) are too big.
- **When to use:** Oversized cookies, giant auth tokens.
- **Why:** Client should shrink headers (clear cookies) and retry.

### 451 Unavailable For Legal Reasons
- **Meaning:** The resource is blocked due to legal demands.
- **When to use:** Court orders, government censorship, DMCA takedowns, regional legal restrictions (e.g. GDPR block).
- **Why:** Transparent: tells users the block is legal, not a technical fault. (Named after *Fahrenheit 451*.)

---

# 5xx: Server Errors

### 500 Internal Server Error
- **Meaning:** Generic "something went wrong on the server."
- **When to use:** Unhandled exception, bug, crashed code, misconfiguration. Use it as a last-resort catch-all.
- **Why:** The client did nothing wrong; the fix is on the server. Log details internally and never leak stack traces to users.

### 501 Not Implemented
- **Meaning:** The server doesn't support the functionality required (e.g. unknown method).
- **When to use:** An endpoint/feature is planned but not built yet, or the HTTP method isn't recognised at all.
- **Why:** Says "I can't do this" (vs. 405, "this URL doesn't allow that method").

### 502 Bad Gateway
- **Meaning:** A gateway/proxy got an invalid response from the upstream server.
- **When to use:** Nginx/load balancer/CDN reaches the app server but it crashed or returned garbage.
- **Why:** Points debugging to the upstream/backend service, not the proxy.

### 503 Service Unavailable
- **Meaning:** The server is temporarily unable to handle requests.
- **When to use:** Overload, maintenance, deploys, dependency outage. Send `Retry-After` if known.
- **Why:** Temporary condition: clients and crawlers should come back later (search engines won't deindex).

### 504 Gateway Timeout
- **Meaning:** A gateway/proxy didn't get a timely response from the upstream server.
- **When to use:** The backend is too slow (long query, hung service) and the proxy gave up.
- **Why:** Indicates a latency problem upstream; the request may or may not have been processed, so be careful retrying non-idempotent calls.

### 505 HTTP Version Not Supported
- **Meaning:** The server doesn't support the HTTP version used.
- **When to use:** Client speaks a version the server refuses.
- **Why:** Tells client to use a supported version.

### 506 Variant Also Negotiates
- **Meaning:** Server configuration error in content negotiation (circular reference).
- **When to use:** Misconfigured negotiation setups.
- **Why:** Signals a server-side config bug. Very rare.

### 507 Insufficient Storage (WebDAV)
- **Meaning:** The server can't store what's needed to complete the request.
- **When to use:** Disk full / quota exceeded on the server.
- **Why:** Temporary or admin-fixable resource problem.

### 508 Loop Detected (WebDAV)
- **Meaning:** The server detected an infinite loop while processing.
- **When to use:** Circular bindings/references.
- **Why:** Stops endless processing.

### 510 Not Extended
- **Meaning:** Further extensions to the request are required.
- **When to use:** Server needs an HTTP extension declaration not provided.
- **Why:** Rare and largely obsolete.

### 511 Network Authentication Required
- **Meaning:** The client must authenticate to gain network access.
- **When to use:** Captive portals (hotel/airport Wi-Fi login pages).
- **Why:** Tells the device it's not on the real internet yet.

---

# Common Non-Standard Codes (good to recognise)

| Code | Source | Meaning |
|------|--------|---------|
| 499 | Nginx | Client closed the connection before the server responded. |
| 520 | Cloudflare | Unknown error from origin server. |
| 521 | Cloudflare | Origin server is down / refused connection. |
| 522 | Cloudflare | Connection to origin timed out. |
| 523 | Cloudflare | Origin is unreachable. |
| 524 | Cloudflare | Origin accepted the connection but took too long to respond. |
| 525 | Cloudflare | SSL handshake with origin failed. |
| 526 | Cloudflare | Invalid SSL certificate at origin. |
| 530 | Cloudflare | Origin DNS or other Cloudflare-side error (e.g. 1xxx errors). |
| 419 | Laravel | Page expired (CSRF token missing/invalid). |
| 440 | IIS | Login time-out. |
| 498 | Esri | Invalid token. |

---

# Cheat Sheet: "Which code should I return?"

| Situation | Code |
|-----------|------|
| Fetched data OK | **200** |
| Created a new record | **201** |
| Deleted / updated, nothing to return | **204** |
| Job queued, not done yet | **202** |
| URL permanently moved | **301** / **308** |
| URL temporarily moved | **302** / **307** |
| After form POST, show result page | **303** |
| Cached copy still valid | **304** |
| Malformed JSON / missing field | **400** |
| Not logged in / bad token | **401** |
| Logged in but not allowed | **403** |
| Resource doesn't exist | **404** |
| Wrong HTTP method | **405** |
| Duplicate / state conflict | **409** |
| Permanently deleted | **410** |
| File too big | **413** |
| Wrong content type | **415** |
| Validation failed (data makes no sense) | **422** |
| Rate limit hit | **429** |
| Unexpected bug on server | **500** |
| Backend returned garbage to gateway | **502** |
| Down for maintenance / overloaded | **503** |
| Backend too slow for gateway | **504** |

---

# Key Differences People Confuse

| Pair | Difference |
|------|------------|
| **401 vs 403** | 401 = not authenticated (who are you?). 403 = authenticated but not permitted. |
| **400 vs 422** | 400 = can't parse/malformed. 422 = parsed fine but values are invalid. |
| **404 vs 410** | 404 = not found (maybe never existed). 410 = existed, deliberately gone forever. |
| **301 vs 302** | 301 = permanent (cached, SEO transfer). 302 = temporary. |
| **302 vs 307/303** | 307 keeps method; 303 forces `GET`; 302 is ambiguous historically. |
| **301 vs 308** | 308 keeps method; 301 may change `POST` to `GET`. |
| **500 vs 502/503/504** | 500 = app itself failed. 502/503/504 = gateway/availability/timeout issues. |
| **200 vs 204** | 200 has a body; 204 deliberately has none. |
| **200 vs 201 vs 202** | OK vs created vs accepted-but-not-finished. |
| **405 vs 501** | 405 = method not allowed on this resource. 501 = server doesn't know the method at all. |
| **502 vs 504** | 502 = bad response from upstream. 504 = no response in time. |

---

# Best Practices

1. **Be specific.** Don't return 200 with `{"error": ...}` or 500 for everything; use the right code.
2. **Include a helpful body** on errors (error code, message, field details), e.g. RFC 9457 Problem Details.
3. **Never leak internals** (stack traces, SQL) in 5xx responses.
4. **Use `Retry-After`** with 429 and 503.
5. **Use `Location`** with 201 and 3xx.
6. **Make retries safe:** retry 5xx/429/408 with backoff only for idempotent requests; don't blindly retry 4xx.
7. **Be consistent** across your whole API and document which codes each endpoint can return.
