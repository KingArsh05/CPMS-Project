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
        Schema::create('user_doctorate_qualification_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('emp_id');
            $table->string('name_of_college');
            $table->string('university');
            $table->text('college_address');
            $table->string('course');
            $table->string('branch');
            $table->enum('marking_scheme', ['percentage', 'cgpa'])->nullable();
            $table->decimal('percentage', 5, 2)->nullable();
            $table->decimal('cgpa', 4, 2)->nullable();
            $table->unsignedSmallInteger('year_of_passing');
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
        Schema::dropIfExists('user_doctorate_qualification_details');
    }
};
