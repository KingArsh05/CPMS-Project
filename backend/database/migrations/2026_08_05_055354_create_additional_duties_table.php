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
        Schema::create('additional_duties', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('emp_id');
            $table->string('position');
            $table->enum('level', ['departmental', 'college', 'state', 'national', 'international'])->default('college');
            $table->string('period'); // e.g. "July 2025 - Dec 2025" or "1 Year"
            $table->string('documented_proof')->nullable(); // file path / url
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
        Schema::dropIfExists('additional_duties');
    }
};
