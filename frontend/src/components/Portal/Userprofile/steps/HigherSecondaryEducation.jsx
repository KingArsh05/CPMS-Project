import { useForm } from "react-hook-form";
import InputField from "../InputField";
import StepActions from "./StepActions";

export default function HigherSecondaryEducation({ nextStep, prevStep }) {
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
      name_of_school: "",
      board: "",
      stream: "",
      year_of_passing: "",
      marking_scheme: "percentage",
      percentage: "",
      cgpa: "",
      school_address: "",
    },
  });


  const onSubmit = (data) => {
    console.log("=== Step 4: Higher Secondary Education Form Data ===", data);
    if (nextStep) nextStep();
  };

  const boardOptions = [
    { value: "CBSE", label: "CBSE (Central Board of Secondary Education)" },
    { value: "ICSE", label: "ISC (Indian School Certificate - Class 12)" },
    { value: "PSEB", label: "PSEB (Punjab School Education Board)" },
    { value: "State_Board", label: "Other State Board" },
    { value: "Diploma", label: "3-Year Technical Diploma / Equivalent" },
    { value: "Other", label: "Other Accredited Board" },
  ];

  const streamOptions = [
    { value: "Non-Medical", label: "Non-Medical (PCM)" },
    { value: "Medical", label: "Medical (PCB)" },
    { value: "Commerce", label: "Commerce" },
    { value: "Arts_Humanities", label: "Arts / Humanities" },
    { value: "Vocational_Diploma", label: "Vocational / Technical Diploma" },
    { value: "Other", label: "Other" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Higher Secondary Education (12th Standard / Diploma)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Provide your 10+2 / intermediate school, board, stream, score, and institutional address.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name of School / College */}
        <InputField
          label="School / Junior College Name"
          id="name_of_school"
          placeholder="e.g. Govt. Senior Secondary School"
          register={register}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "School/College name is required",
            },
          }}
        />

        {/* Board */}
        <InputField
          label="Board / Council of Examination"
          id="board"
          type="select"
          placeholder="Select Board / Council"
          options={boardOptions}
          register={register}
          control={control}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "Board is required",
            },
          }}
        />

        {/* Stream */}
        <InputField
          label="Academic Stream / Specialization"
          id="stream"
          type="select"
          placeholder="Select Stream"
          options={streamOptions}
          register={register}
          control={control}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "Stream is required",
            },
          }}
        />

        {/* Year of Passing */}
        <InputField
          label="Year of Passing"
          id="year_of_passing"
          inputMode="numeric"
          placeholder="e.g. 2016"
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

        {/* School Address */}
        <div className="sm:col-span-2">
          <InputField
            label="Institution Address"
            id="school_address"
            type="textarea"
            rows={3}
            placeholder="Enter school/college location, city, and state"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "Institution address is required",
              },
            }}
          />
        </div>
      </div>

      <StepActions
        stepNumber={4}
        totalSteps={7}
        prevStep={prevStep}
      />
    </form>
  );
}
