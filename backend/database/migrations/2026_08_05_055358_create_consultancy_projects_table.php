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
        Schema::create('consultancy_projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('emp_id');
            $table->string('title');
            $table->decimal('cost', 12, 2);
            $table->string('position');
            $table->string('sponsor_name');
            $table->date('date_of_commencement');
            $table->string('duration');
            $table->enum('status', ['completed', 'ongoing'])->default('ongoing');
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
        Schema::dropIfExists('consultancy_projects');
    }
};
