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
        Schema::create('user_teaching_experiences', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('emp_id');
            $table->string('organization');
            $table->text('organization_address');
            $table->string('designation');
            $table->date('joining_date');
            $table->date('relieving_date')->nullable(); // nullable if currently working
            $table->unsignedInteger('experience_months')->nullable(); // calculated total experience in months
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
        Schema::dropIfExists('user_teaching_experiences');
    }
};
