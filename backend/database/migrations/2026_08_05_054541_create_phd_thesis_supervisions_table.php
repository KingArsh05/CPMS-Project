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
        Schema::create('phd_thesis_supervisions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('emp_id');
            $table->string('name_of_student');
            $table->string('registration_number_of_student', 50);
            $table->string('co_supervisor_name')->nullable();
            $table->enum('course_work_status', ['not_started', 'in_progress', 'completed'])->default('not_started');
            $table->enum('research_work_status', ['not_started', 'in_progress', 'completed'])->default('not_started');
            $table->text('comments')->nullable();
            $table->unsignedInteger('commented_by_emp_id')->nullable();
            $table->timestamps();

            // Foreign key to users (owner)
            $table->foreign('emp_id')
                ->references('emp_id')
                ->on('users')
                ->onDelete('cascade');

            // Foreign key to users (commenter)
            $table->foreign('commented_by_emp_id')
                ->references('emp_id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phd_thesis_supervisions');
    }
};
