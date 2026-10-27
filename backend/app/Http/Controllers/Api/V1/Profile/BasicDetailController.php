<?php

namespace App\Http\Controllers\Api\V1\Profile;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Profile\BasicDetailRequest;
use App\Http\Resources\Api\V1\Profile\BasicDetailResource;
use App\Models\UserBasicDetail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class BasicDetailController extends Controller
{
    /**
     * GET /api/v1/profile/basic-details
     * Fetches current faculty basic details to fill the form.
     */
    public function show(Request $request): JsonResponse
    {
        $detail = UserBasicDetail::where('emp_id', $request->user()->emp_id)->first();
        return response()->json([
            'data' => $detail ? new BasicDetailResource($detail) : null,
        ]);
    }
    /**
     * POST /api/v1/profile/basic-details
     * Saves or updates faculty basic details securely.
     */
    public function store(BasicDetailRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        // Display incoming request data in the backend artisan serve terminal
        error_log("\n========================================================");
        error_log("📥 [PROFILE - BASIC DETAILS] Received Payload from Frontend:");
        error_log("Faculty Emp ID : " . ($user->emp_id ?? 'Unknown'));
        error_log("Faculty Email  : " . ($user->college_email_id ?? 'Unknown'));
        error_log("Form Data: " . json_encode($request->except('profile_pic'), JSON_PRETTY_PRINT));
        if ($request->hasFile('profile_pic')) {
            $file = $request->file('profile_pic');
            error_log("Uploaded File  : " . $file->getClientOriginalName() . " (" . $file->getSize() . " bytes, " . $file->getMimeType() . ")");
        } else {
            error_log("Uploaded File  : None");
        }
        error_log("========================================================\n");

        \Illuminate\Support\Facades\Log::info('Profile basic details received', [
            'emp_id' => $user->emp_id,
            'payload' => $request->except('profile_pic'),
            'has_file' => $request->hasFile('profile_pic'),
        ]);

        // Handle profile picture upload securely if a file was provided
        if ($request->hasFile('profile_pic')) {
            $path = $request->file('profile_pic')->store('profile_pictures', 'public');
            $validated['profile_pic'] = $path;
        }

        // Eloquent updateOrCreate: saves or updates in 1 single line!
        $detail = UserBasicDetail::updateOrCreate(
            ['emp_id' => $user->emp_id], // search by
            $validated                   // update or insert values
        );

        return response()->json([
            'message' => 'Basic details saved successfully.',
            'data'    => new BasicDetailResource($detail),
        ], 200);
    }
}
