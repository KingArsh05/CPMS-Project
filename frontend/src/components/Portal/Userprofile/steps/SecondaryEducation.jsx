import { useForm } from "react-hook-form";
import InputField from "../InputField";
import StepActions from "./StepActions";

export default function SecondaryEducation({ nextStep, prevStep }) {
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
      year_of_passing: "",
      marking_scheme: "percentage",
      percentage: "",
      cgpa: "",
      school_address: "",
    },
  });


  const onSubmit = (data) => {
    console.log("=== Step 3: Secondary Education Form Data ===", data);
    if (nextStep) nextStep();
  };

  const boardOptions = [
    { value: "CBSE", label: "CBSE (Central Board of Secondary Education)" },
    { value: "ICSE", label: "ICSE (Indian Certificate of Secondary Education)" },
    { value: "PSEB", label: "PSEB (Punjab School Education Board)" },
    { value: "State_Board", label: "Other State Board" },
    { value: "Other", label: "Other Accredited Board" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Secondary Education (10th Standard)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Provide your 10th standard school, board, score, and institutional address.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name of School */}
        <InputField
          label="Name of School"
          id="name_of_school"
          placeholder="e.g. St. Xavier's Senior Secondary School"
          register={register}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "School name is required",
            },
          }}
        />

        {/* Board */}
        <InputField
          label="Board of Examination"
          id="board"
          type="select"
          placeholder="Select Board"
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

        {/* Year of Passing */}
        <InputField
          label="Year of Passing"
          id="year_of_passing"
          inputMode="numeric"
          placeholder="e.g. 2014"
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
            label="School Address"
            id="school_address"
            type="textarea"
            rows={3}
            placeholder="Enter school location, city, and state"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "School address is required",
              },
            }}
          />
        </div>
      </div>

      <StepActions
        stepNumber={3}
        totalSteps={7}
        prevStep={prevStep}
      />
    </form>
  );
}
