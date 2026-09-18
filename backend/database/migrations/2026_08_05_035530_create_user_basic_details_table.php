<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_basic_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger("emp_id");
            $table->string('profile_pic')->nullable();
            $table->string('aadhaar_number', 12)->unique();
            $table->string('pancard_number', 10)->unique();
            $table->text('present_address');
            $table->date('dob'); // format year-month-day
            $table->enum('blood_group', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
            $table->string('contact_number', 10);
            // timestamps
            $table->timestamps();
            
            // foreign key
            $table->foreign('emp_id')
                ->references('emp_id')
                ->on('users')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_basic_details');
    }
};
