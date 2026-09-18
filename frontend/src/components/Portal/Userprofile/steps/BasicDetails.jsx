import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../InputField";

function SectionIcon({ type }) {
  if (type === "identity") {
    return (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 21a8 8 0 00-16 0M12 13a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
    );
  }

  if (type === "personal") {
    return (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 9h8M8 13h5M8 17h3"
        />
      </svg>
    );
  }

  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.33 1.78.62 2.63a2 2 0 01-.45 2.11L8 9.73a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0122 16.92z"
      />
    </svg>
  );
}

function FormSection({ icon, title, description, children }) {
  return (
    <section className="relative border border-slate-200 dark:border-slate-800 rounded-xl">
      <div className="flex items-center gap-3 px-5 py-4 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-center w-8 h-8 shrink-0 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-lg">
          <SectionIcon type={icon} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
}

function InformationNote() {
  return (
    <div className="flex items-start gap-3 px-4 py-3 text-xs text-slate-600 dark:text-slate-300 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl">
      <svg
        className="w-4 h-4 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-7-3a1 1 0 10-2 0v1a1 1 0 102 0V7zm0 4a1 1 0 10-2 0v3a1 1 0 102 0v-3z"
          clipRule="evenodd"
        />
      </svg>

      <p className="leading-relaxed">
        Please provide your personal information exactly as it appears on your
        official institutional and government records.
      </p>
    </div>
  );
}

export default function BasicDetails() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A−" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B−" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB−" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O−" },
  ];

  return (
    <div className="space-y-5">
      <InformationNote />

      <FormSection
        icon="identity"
        title="Identity Information"
        description="Your institutional identity and government identification details"
      >
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              Employee ID
            </label>

            <input
              type="text"
              value="Auto-filled from institutional account"
              readOnly
              className="w-full h-11 px-4 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl cursor-not-allowed"
            />

            <p className="mt-1.5 text-[10px] text-slate-400">
              Employee ID is managed by the institution.
            </p>
          </div>

          <InputField
            label="Aadhaar Number"
            id="aadhaar_number"
            type="text"
            inputMode="numeric"
            placeholder="Enter 12-digit Aadhaar number"
            register={register}
            errors={errors}
            rules={{
              required: "Aadhaar number is required",
              pattern: {
                value: /^\d{12}$/,
                message: "Enter a valid 12-digit Aadhaar number",
              },
            }}
          />

          <InputField
            label="PAN Number"
            id="pancard_number"
            type="text"
            placeholder="Enter PAN number"
            register={register}
            errors={errors}
            rules={{
              required: "PAN number is required",
              pattern: {
                value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                message: "Enter a valid PAN number",
              },
            }}
          />

          <InputField
            label="Blood Group"
            id="blood_group"
            type="select"
            placeholder="Select blood group"
            options={bloodGroupOptions}
            register={register}
            control={control}
            errors={errors}
            rules={{
              required: "Blood group is required",
            }}
          />
        </div>
      </FormSection>

      <FormSection
        icon="personal"
        title="Personal Information"
        description="Basic personal information required for your faculty profile"
      >
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
          <InputField
            label="Date of Birth"
            id="dob"
            type="date"
            placeholder="dd/mm/yyyy"
            register={register}
            control={control}
            errors={errors}
            maxDate={new Date()}
            rules={{
              required: "Date of birth is required",
            }}
          />

          <div>
            <label
              htmlFor="profile_pic"
              className="block mb-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Profile Picture
            </label>

            <input
              id="profile_pic"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              {...register("profile_pic")}
              className="w-full h-11 px-3 py-2 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl file:mr-3 file:px-3 file:py-1.5 file:border-0 file:rounded-lg file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 focus:outline-none focus:border-blue-500"
            />

            <p className="mt-1.5 text-[10px] text-slate-400">
              JPG, PNG or WebP. Use a clear professional photograph.
            </p>
          </div>
        </div>
      </FormSection>

      <FormSection
        icon="contact"
        title="Contact Information"
        description="Your current contact details and residential address"
      >
        <div className="space-y-5">
          <InputField
            label="Contact Number"
            id="contact_number"
            type="tel"
            inputMode="numeric"
            placeholder="Enter 10-digit mobile number"
            register={register}
            errors={errors}
            rules={{
              required: "Contact number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            }}
          />

          <InputField
            label="Present Address"
            id="present_address"
            type="textarea"
            rows={4}
            placeholder="Enter your complete present address"
            register={register}
            errors={errors}
            rules={{
              required: "Present address is required",
              minLength: {
                value: 10,
                message: "Please enter a complete address",
              },
            }}
          />
        </div>
      </FormSection>

      <div className="flex items-center gap-2 px-1 text-[11px] text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
        All required information must be completed before continuing to the next
        step.
      </div>
    </div>
  );
}
