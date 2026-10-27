import { useForm } from "react-hook-form";
import InputField from "../InputField";
import StepActions from "./StepActions";

export default function UndergraduateEducation({ nextStep, prevStep }) {
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
      name_of_college: "",
      university: "",
      course: "",
      branch: "",
      year_of_passing: "",
      marking_scheme: "percentage",
      percentage: "",
      cgpa: "",
      college_address: "",
    },
  });

  const onSubmit = (data) => {
    console.log("=== Step 5: Undergraduate Education Form Data ===", data);
    if (nextStep) nextStep();
  };

  const courseOptions = [
    { value: "B.Tech", label: "B.Tech (Bachelor of Technology)" },
    { value: "B.E.", label: "B.E. (Bachelor of Engineering)" },
    { value: "BCA", label: "BCA (Bachelor of Computer Applications)" },
    { value: "B.Sc", label: "B.Sc (Bachelor of Science)" },
    { value: "B.Com", label: "B.Com" },
    { value: "B.A.", label: "B.A." },
    { value: "Other", label: "Other Bachelor Degree" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Undergraduate Education (UG Qualification)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Enter your bachelor's degree college, university, branch, year of passing, and score.
        </p>
      </div>

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
              value: true,
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
              value: true,
              message: "University is required",
            },
          }}
        />

        {/* Course (e.g. B.Tech) */}
        <InputField
          label="Undergraduate Course / Degree"
          id="course"
          type="select"
          placeholder="Select Course"
          options={courseOptions}
          register={register}
          control={control}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "Course is required",
            },
          }}
        />

        {/* Branch (e.g. CSE) */}
        <InputField
          label="Branch / Specialization"
          id="branch"
          placeholder="e.g. Computer Science & Engineering"
          register={register}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "Branch is required",
            },
          }}
        />

        {/* Year of Passing */}
        <InputField
          label="Year of Passing"
          id="year_of_passing"
          inputMode="numeric"
          placeholder="e.g. 2018"
          register={register}
          errors={errors}
          rules={{
            required: {
              value: true,
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
          required={true}
        />

        {/* College Address */}
        <div className="sm:col-span-2">
          <InputField
            label="College / Institute Address"
            id="college_address"
            type="textarea"
            rows={3}
            placeholder="Enter complete college address"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "College address is required",
              },
            }}
          />
        </div>
      </div>

      <StepActions
        stepNumber={5}
        totalSteps={7}
        prevStep={prevStep}
      />
    </form>
  );
}
