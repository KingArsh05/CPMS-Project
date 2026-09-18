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
        Schema::create('annual_appraisal_reports', function (Blueprint $table) {
            $table->id();
            
            // Faculty & Officer Employee References
            $table->unsignedInteger('emp_id');
            $table->unsignedInteger('reporting_officer_emp_id');
            $table->unsignedInteger('reviewing_officer_emp_id')->nullable();
            $table->unsignedInteger('principal_emp_id')->nullable();

            $table->string('academic_year', 10)->nullable();

            // Section I: Attitude and Interpersonal Skills (14 parameters, ratings 1-5)
            $table->tinyInteger('initiative')->nullable()->comment('1. Initiative : a self starter ; able to work without constant supervision');
            $table->tinyInteger('responsibility')->nullable()->comment('2. Responsibility: understands duties; accepts responsibilities readily');
            $table->tinyInteger('punctuality')->nullable()->comment('3. Punctuality: arrives on time, Generally available for students during working hours');
            $table->tinyInteger('commitment')->nullable()->comment('4. Commitment : Committed to his/ her work');
            $table->tinyInteger('loyalty')->nullable()->comment('5. Loyalty : supports and follows institute\'s policies and guidelines');
            $table->tinyInteger('development')->nullable()->comment('6. Development : Keeps knowledge up to date');
            $table->tinyInteger('oral_communication')->nullable()->comment('7. Oral Communication : speaks effectively with supervision, colleagues and students');
            $table->tinyInteger('written_communication')->nullable()->comment('8. Written Communication');
            $table->tinyInteger('teamwork')->nullable()->comment('9. Teamwork : effective in team');
            $table->tinyInteger('leadership')->nullable()->comment('10. Leadership : gives clear direction and listens to co-workers');
            $table->tinyInteger('relationship_with_fellow_faculty_and_staff')->nullable()->comment('11. Relationship with fellow faculty and staff');
            $table->tinyInteger('maturity')->nullable()->comment('12. Maturity');
            $table->tinyInteger('temperament')->nullable()->comment('13. Temperament');
            $table->tinyInteger('relationship_with_students')->nullable()->comment('14. Relationship with students');
            
            // Total Score
            $table->unsignedSmallInteger('total_score')->nullable();

            // Section II & III: Comments and Appraisals
            $table->enum('overall_appraisal', ['outstanding', 'very_good', 'good', 'average', 'poor'])->nullable()->comment('Overall appraisal rating');
            $table->text('reporting_officer_comments')->nullable()->comment('Brief comments by Reporting Officer');
            $table->text('reviewing_officer_remarks')->nullable()->comment('Remarks of Reviewing Officers');
            $table->text('principal_comments')->nullable()->comment('Comments of Principal');

            $table->timestamps();

            // Foreign Key Constraints
            $table->foreign('emp_id')->references('emp_id')->on('users')->onDelete('cascade');
            $table->foreign('reporting_officer_emp_id')->references('emp_id')->on('users')->onDelete('cascade');
            $table->foreign('reviewing_officer_emp_id')->references('emp_id')->on('users')->onDelete('set null');
            $table->foreign('principal_emp_id')->references('emp_id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annual_appraisal_reports');
    }
};
