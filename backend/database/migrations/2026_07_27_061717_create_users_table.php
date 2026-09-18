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
        Schema::create('users', function (Blueprint $table) {
            $table->unsignedInteger('emp_id')->primary();
            $table->string("college_id", 20)->unique();
            $table->string("name", 50);
            $table->string("college_email_id", 100)->unique();
            $table->string('password', 255);
            $table->enum(
                'role',
                [
                    'staff',
                    'teacher',
                    'hod',
                    'establishment',
                    'principal',
                    'admin'
                ]
            )->comment('System role');
            $table->enum(
                'designation',
                [
                    'professor',
                    'associate_professor',
                    'assistant_professor',
                    "hod"
                ]
            );
            $table->enum('status', ['active', 'inactive', 'retired', "suspended"])->default('active');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
