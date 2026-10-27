import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import StepActions from "./StepActions";

export default function DoctorateEducation({ prevStep }) {
  const [hasDoctorate, setHasDoctorate] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      marking_scheme: "percentage",
    },
  });


  const onSubmit = (data) => {
    if (!hasDoctorate) {
      console.log("=== Step 6: Doctorate Skipped by user / Not Applicable ===");
    } else {
      console.log("=== Step 6: Doctorate Education Form Data ===", data);
    }
    alert("🎉 Profile verification and setup completed successfully! Check the browser console to review all submitted data.");
  };

  const handleSkip = () => {
    console.log("=== Step 6: Doctorate Skipped ===");
    alert("🎉 Profile setup complete! (Doctorate marked as not applicable).");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Doctorate Qualification (PhD)
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-md uppercase">
              Optional
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Add your doctoral qualification and awarding research institute details, or complete your profile.
          </p>
        </div>

        {/* Modern Interactive Switch Pill */}
        <label
          htmlFor="has-phd-toggle"
          className={`group inline-flex items-center gap-3 px-3.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer select-none self-start sm:self-auto ${
            hasDoctorate
              ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 shadow-xs shadow-blue-500/10"
              : "bg-slate-50/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100/60 dark:hover:bg-slate-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs transition-colors ${
                hasDoctorate
                  ? "bg-blue-600 text-white shadow-2xs shadow-blue-500/30"
                  : "bg-slate-200/80 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              I hold a Doctorate (PhD)
            </span>
          </div>

          <div className="relative inline-flex items-center">
            <input
              id="has-phd-toggle"
              type="checkbox"
              checked={hasDoctorate}
              onChange={(e) => setHasDoctorate(e.target.checked)}
              className="sr-only peer"
            />
            {/* Track */}
            <div
              className={`w-9 h-5 rounded-full transition-colors duration-200 ease-in-out ${
                hasDoctorate
                  ? "bg-blue-600"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            />
            {/* Thumb */}
            <div
              className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out flex items-center justify-center ${
                hasDoctorate ? "translate-x-4" : "translate-x-0"
              }`}
            >
              {hasDoctorate && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </div>
          </div>
        </label>
      </div>

      {!hasDoctorate ? (
        <div className="p-8 text-center bg-slate-50/60 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0H9.497m5.003 0a2.25 2.25 0 002.25-2.25v-.872c0-.51-.345-.953-.842-1.066l-3.376-.772a2.25 2.25 0 00-1.004 0l-3.376.772a1.084 1.084 0 00-.842 1.066v.872a2.25 2.25 0 002.25 2.25" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Doctorate Section is Optional
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            If you do not hold a PhD degree, click <strong>Complete Profile</strong> below to finalize your faculty setup.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name of College / Institute */}
          <InputField
            label="Research Institute / College"
            id="name_of_college"
            placeholder="e.g. Indian Institute of Technology"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: hasDoctorate,
                message: "Institute name is required",
              },
            }}
          />

          {/* University */}
          <InputField
            label="Awarding University"
            id="university"
            placeholder="e.g. IIT Roorkee / PTU"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: hasDoctorate,
                message: "University is required",
              },
            }}
          />

          {/* Course */}
          <InputField
            label="Doctorate Degree / Course"
            id="course"
            placeholder="e.g. Ph.D."
            register={register}
            errors={errors}
            rules={{
              required: {
                value: hasDoctorate,
                message: "Degree name is required",
              },
            }}
          />

          {/* Branch / Research Area */}
          <InputField
            label="Branch / Research Specialization"
            id="branch"
            placeholder="e.g. Machine Learning & Computer Vision"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: hasDoctorate,
                message: "Research branch is required",
              },
            }}
          />

          {/* Year of Passing */}
          <InputField
            label="Year of Award"
            id="year_of_passing"
            inputMode="numeric"
            placeholder="e.g. 2023"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: hasDoctorate,
                message: "Year of award is required",
              },
              pattern: {
                value: /^(19|20)\d{2}$/,
                message: "Enter a valid 4-digit year",
              },
            }}
          />

          {/* Optional Marking Scheme / Score */}
          <InputField
            type="score"
            label="Evaluation Score"
            id="score"
            schemeName="marking_scheme"
            percentageName="percentage"
            cgpaName="cgpa"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            required={false}
            disabled={!hasDoctorate}
          />

          {/* College Address */}
          <div className="sm:col-span-2">
            <InputField
              label="Institute Address"
              id="college_address"
              type="textarea"
              rows={3}
              placeholder="Enter research institute or awarding university address"
              register={register}
              errors={errors}
              rules={{
                required: {
                  value: hasDoctorate,
                  message: "Institute address is required",
                },
              }}
            />
          </div>
        </div>
      )}

      <StepActions
        stepNumber={7}
        totalSteps={7}
        prevStep={prevStep}
        saveButtonText="Complete Profile"
        isOptional={true}
        onSkip={handleSkip}
      />
    </form>
  );
}
