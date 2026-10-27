import { useForm } from "react-hook-form";
import InputField from "../InputField";
import StepActions from "./StepActions";

export default function ProfessionalDetails({ nextStep, prevStep }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      date_of_joining: "",
      faculty_serving: "",
      last_promotion_date: "",
      retirement_date: "",
      relieving_date: "",
    },
  });

  const facultyServing = watch("faculty_serving");

  const onSubmit = (data) => {
    console.log("=== Step 2: Professional Details Form Data ===", data);
    if (nextStep) nextStep();
  };

  const facultyServingOptions = [
    { value: "permanent", label: "Permanent" },
    { value: "part-time", label: "Part-time" },
    { value: "contractual", label: "Contractual" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Professional & Service Details
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Record your institutional joining date, appointment type, promotions, and tenure details.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date of Joining (Required) */}
        <InputField
          label="Date of Joining"
          id="date_of_joining"
          type="date"
          placeholder="Select joining date"
          register={register}
          control={control}
          errors={errors}
          maxDate={new Date()}
          rules={{
            required: {
              value: true,
              message: "Date of joining is required",
            },
          }}
        />

        {/* Faculty Serving Enum (Required) */}
        <InputField
          label="Faculty Serving Status"
          id="faculty_serving"
          type="select"
          placeholder="Select serving status"
          options={facultyServingOptions}
          register={register}
          control={control}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "Serving status is required",
            },
          }}
        />

        {/* Last Promotion Date (Optional) */}
        <InputField
          label="Last Promotion Date"
          id="last_promotion_date"
          type="date"
          placeholder="Select last promotion date"
          register={register}
          control={control}
          errors={errors}
          maxDate={new Date()}
        />

        {/* Retirement Date (Required/Relevant if Permanent - Future Date) */}
        <InputField
          label={`Expected Retirement Date ${facultyServing === "permanent" ? "*" : "(Optional)"}`}
          id="retirement_date"
          type="date"
          placeholder="Select retirement date"
          register={register}
          control={control}
          errors={errors}
          allowFuture={true}
          rules={{
            required: {
              value: facultyServing === "permanent",
              message: "Retirement date is required for permanent faculty",
            },
          }}
        />

        {/* Relieving Date (Optional) */}
        <div className="sm:col-span-2">
          <InputField
            label="Relieving Date (Optional)"
            id="relieving_date"
            type="date"
            placeholder="Select relieving date"
            register={register}
            control={control}
            errors={errors}
            allowFuture={true}
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Leave relieving date empty if you are actively serving at the institution.
          </p>
        </div>
      </div>

      <StepActions
        stepNumber={2}
        totalSteps={7}
        prevStep={prevStep}
      />
    </form>
  );
}
