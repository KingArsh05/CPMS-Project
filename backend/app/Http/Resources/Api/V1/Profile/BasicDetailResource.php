<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1\Profile;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BasicDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'emp_id'          => $this->emp_id,
            'aadhaar_number'  => $this->aadhaar_number,
            'pancard_number'  => $this->pancard_number,
            'blood_group'     => $this->blood_group,
            'dob'             => $this->dob 
                ? ($this->dob instanceof \DateTimeInterface 
                    ? $this->dob->format('Y-m-d') 
                    : Carbon::parse($this->dob)->format('Y-m-d')) 
                : null,
            'contact_number'  => $this->contact_number,
            'present_address' => $this->present_address,
            'profile_pic_url' => $this->profile_pic 
                ? (str_starts_with($this->profile_pic, 'http') 
                    ? $this->profile_pic 
                    : asset(Storage::url($this->profile_pic))) 
                : null,
            'created_at'      => $this->created_at 
                ? $this->created_at->timezone('Asia/Kolkata')->format('Y-m-d H:i:s') 
                : null,
            'updated_at'      => $this->updated_at 
                ? $this->updated_at->timezone('Asia/Kolkata')->format('Y-m-d H:i:s') 
                : null,
        ];
    }
}
