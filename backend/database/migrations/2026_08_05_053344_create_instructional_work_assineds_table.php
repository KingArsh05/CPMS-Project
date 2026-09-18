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
        Schema::create('instructional_work_assigneds', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('emp_id');
            $table->unsignedTinyInteger('semester'); // 1 to 8 or 10
            $table->string('course_code', 20);
            $table->string('course_title');
            $table->unsignedSmallInteger('lecture_hours_per_week')->default(0);
            $table->unsignedSmallInteger('tutorial_hours_per_week')->default(0);
            $table->unsignedSmallInteger('practical_hours_per_week')->default(0);
            $table->unsignedSmallInteger('strength_of_class');
            $table->decimal('result_percentage_a_grade', 5, 2)->nullable();
            $table->decimal('result_percentage_pass', 5, 2)->nullable();
            $table->text('comments')->nullable();
            $table->unsignedInteger('commented_by_emp_id')->nullable(); // emp_id of HOD/Principal/Admin who commented
            $table->timestamps();

            // Foreign Key: Owner Employee
            $table->foreign('emp_id')
                ->references('emp_id')
                ->on('users')
                ->onDelete('cascade');

            // Foreign Key: Commenter Employee
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
        Schema::dropIfExists('instructional_work_assineds');
    }
};
