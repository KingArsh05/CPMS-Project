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
        Schema::create('btech_project_supervisions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('emp_id');
            $table->string('name_of_student');
            $table->string('urn_of_student', 30);
            $table->string('co_supervisor_name')->nullable();
            $table->enum('course_work_status', ['completed', 'not_completed'])->default('not_completed');
            $table->date('date_of_submission')->nullable();
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
        Schema::dropIfExists('btech_project_supervisions');
    }
};
