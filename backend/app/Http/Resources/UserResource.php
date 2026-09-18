<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'emp_id' => $this->emp_id,
            'college_id' => $this->college_id,
            'name' => $this->name,
            'college_email_id' => $this->college_email_id,
            'role' => $this->role,
            'designation' => $this->designation,
            'status' => $this->status,
        ];
    }
}