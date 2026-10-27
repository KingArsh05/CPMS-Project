<?php

test('health check returns ok status', function () {
    $response = $this->getJson(route('api.health'));

    $response->assertOk()
        ->assertJsonPath('status', 'ok');
});

test('unauthenticated request to auth user endpoint returns 401 json', function () {
    $response = $this->getJson(route('api.v1.auth.user'));

    $response->assertStatus(401)
        ->assertJson(['message' => 'Unauthenticated.']);
});
