import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import StepActions from "./StepActions";

export default function PostgraduateEducation({ nextStep, prevStep }) {
  const [hasPG, setHasPG] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      marking_scheme: "percentage",
    },
  });


  const onSubmit = (data) => {
    if (!hasPG) {
      console.log("=== Step 5: PG Education Skipped by user ===");
      if (nextStep) nextStep();
      return;
    }
    console.log("=== Step 5: Postgraduate Education Form Data ===", data);
    if (nextStep) nextStep();
  };

  const handleSkip = () => {
    console.log("=== Step 5: PG Education Skipped ===");
    if (nextStep) nextStep();
  };

  const pgCourseOptions = [
    { value: "M.Tech", label: "M.Tech (Master of Technology)" },
    { value: "M.E.", label: "M.E. (Master of Engineering)" },
    { value: "MCA", label: "MCA (Master of Computer Applications)" },
    { value: "M.Sc", label: "M.Sc (Master of Science)" },
    { value: "MBA", label: "MBA" },
    { value: "M.Com", label: "M.Com" },
    { value: "M.A.", label: "M.A." },
    { value: "Other", label: "Other Master's Degree" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Postgraduate Education (PG Qualification)
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-md uppercase">
              Optional
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Add your master's degree records if applicable, or skip to the next step.
          </p>
        </div>

        {/* Modern Interactive Switch Pill */}
        <label
          htmlFor="has-pg-toggle"
          className={`group inline-flex items-center gap-3 px-3.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer select-none self-start sm:self-auto ${
            hasPG
              ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 shadow-xs shadow-blue-500/10"
              : "bg-slate-50/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100/60 dark:hover:bg-slate-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs transition-colors ${
                hasPG
                  ? "bg-blue-600 text-white shadow-2xs shadow-blue-500/30"
                  : "bg-slate-200/80 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
              </svg>
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              I hold a PG Degree
            </span>
          </div>

          <div className="relative inline-flex items-center">
            <input
              id="has-pg-toggle"
              type="checkbox"
              checked={hasPG}
              onChange={(e) => setHasPG(e.target.checked)}
              className="sr-only peer"
            />
            {/* Track */}
            <div
              className={`w-9 h-5 rounded-full transition-colors duration-200 ease-in-out ${
                hasPG
                  ? "bg-blue-600"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            />
            {/* Thumb */}
            <div
              className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out flex items-center justify-center ${
                hasPG ? "translate-x-4" : "translate-x-0"
              }`}
            >
              {hasPG && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </div>
          </div>
        </label>
      </div>

      {!hasPG ? (
        <div className="p-8 text-center bg-slate-50/60 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Postgraduate Section Marked as Not Applicable
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            You have marked that you do not hold a postgraduate degree. You can proceed directly to the next section or toggle above to add records.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name of College */}
          <InputField
            label="College / Institute Name"
            id="name_of_college"
            placeholder="e.g. Guru Nanak Dev Engineering College"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: hasPG,
                message: "College name is required",
              },
            }}
          />

          {/* University */}
          <InputField
            label="Awarding University"
            id="university"
            placeholder="e.g. IKG Punjab Technical University"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: hasPG,
                message: "University is required",
              },
            }}
          />

          {/* Course */}
          <InputField
            label="Postgraduate Course / Degree"
            id="course"
            type="select"
            placeholder="Select PG Course"
            options={pgCourseOptions}
            register={register}
            control={control}
            errors={errors}
            rules={{
              required: {
                value: hasPG,
                message: "Course is required",
              },
            }}
          />

          {/* Branch */}
          <InputField
            label="Branch / Specialization"
            id="branch"
            placeholder="e.g. Computer Science & Engineering"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: hasPG,
                message: "Branch is required",
              },
            }}
          />

          {/* Year of Passing */}
          <InputField
            label="Year of Passing"
            id="year_of_passing"
            inputMode="numeric"
            placeholder="e.g. 2021"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: hasPG,
                message: "Year of passing is required",
              },
              pattern: {
                value: /^(19|20)\d{2}$/,
                message: "Enter a valid 4-digit year",
              },
            }}
          />

          {/* Marking Scheme Switcher & Score */}
          <InputField
            type="score"
            label="Marking Scheme & Score"
            id="score"
            schemeName="marking_scheme"
            percentageName="percentage"
            cgpaName="cgpa"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            required={hasPG}
            disabled={!hasPG}
          />

          {/* College Address */}
          <div className="sm:col-span-2">
            <InputField
              label="College / Institute Address"
              id="college_address"
              type="textarea"
              rows={3}
              placeholder="Enter complete postgraduate institute address"
              register={register}
              errors={errors}
              rules={{
                required: {
                  value: hasPG,
                  message: "College address is required",
                },
              }}
            />
          </div>
        </div>
      )}

      <StepActions
        stepNumber={6}
        totalSteps={7}
        prevStep={prevStep}
        isOptional={true}
        onSkip={handleSkip}
      />
    </form>
  );
}
