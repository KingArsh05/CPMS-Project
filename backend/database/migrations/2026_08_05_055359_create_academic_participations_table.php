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
        Schema::create('academic_participations', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('emp_id');
            $table->string('title');
            $table->string('duration');
            $table->string('institution');
            $table->string('position');
            $table->enum('category', ['seminar', 'workshop', 'conference', 'fdp', 'training', 'mooc'])->default('workshop');
            $table->enum('level', ['departmental', 'college', 'state', 'national', 'international'])->default('college');
            $table->string('documented_proof')->nullable();
            $table->text('comments')->nullable();
            $table->unsignedInteger('commented_by_emp_id')->nullable();
            $table->timestamps();

            $table->foreign('emp_id')->references('emp_id')->on('users')->onDelete('cascade');
            $table->foreign('commented_by_emp_id')->references('emp_id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_participations');
    }
};
