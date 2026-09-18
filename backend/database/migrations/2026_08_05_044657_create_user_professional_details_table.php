<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_professional_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('emp_id');
            $table->date('date_of_joining');
            $table->date('relieving_date')->nullable();
            $table->enum('faculty_serving', ['permanent', 'part-time', 'contractual']);
            $table->date('retirement_date')->nullable(); // nullable; relevant for permanent faculty
            $table->date('last_promotion_date')->nullable();
            // timestamps
            $table->timestamps();
            // foreign key reference to users table
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
        Schema::dropIfExists('user_professional_details');
    }
};
