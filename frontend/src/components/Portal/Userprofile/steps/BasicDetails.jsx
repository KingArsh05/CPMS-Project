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
    <section className="relative border border-slate-200/90 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 rounded-t-xl">
        <div className="flex items-center justify-center w-7 h-7 shrink-0 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-lg">
          <SectionIcon type={icon} />
        </div>

        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </h3>

          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">{children}</div>
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

import StepActions from "./StepActions";
import { useEffect, useState } from "react";

const DEMO_BASIC_DETAILS = {
  aadhaar_number: "123456789012",
  pancard_number: "ABCDE1234F",
  blood_group: "O+",
  dob: "1995-08-15",
  contact_number: "9876543210",
  present_address:
    "123, Faculty Enclave, GNDEC Campus, Gill Park, Ludhiana, Punjab - 141006",
};

export default function BasicDetails({ prevStep, nextStep }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useFormContext();

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [existingPhotoUrl, setExistingPhotoUrl] = useState(null);

  // Load existing profile details from backend API on mount
  useEffect(() => {
    let isMounted = true;

    const loadExistingDetails = async () => {
      try {
        const { data } = await api.get("/profile/basic-details");
        if (isMounted && data?.data) {
          const remoteData = data.data;
          setExistingPhotoUrl(remoteData.profile_pic_url || null);
          reset((prev) => ({
            ...prev,
            aadhaar_number: remoteData.aadhaar_number || "",
            pancard_number: remoteData.pancard_number || "",
            blood_group: remoteData.blood_group || "",
            dob: remoteData.dob || "",
            contact_number: remoteData.contact_number || "",
            present_address: remoteData.present_address || "",
          }));
        } else if (isMounted) {
          // Fallback to initial demo values if database has no record yet
          reset((prev) => ({
            ...prev,
            ...DEMO_BASIC_DETAILS,
          }), { keepDirtyValues: true });
        }
      } catch {
        if (isMounted) {
          reset((prev) => ({
            ...prev,
            ...DEMO_BASIC_DETAILS,
          }), { keepDirtyValues: true });
        }
      }
    };

    loadExistingDetails();

    return () => {
      isMounted = false;
    };
  }, [reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitSuccess(false);

    // Format Date of Birth if it is a Date object
    let formattedDob = data.dob;
    if (data.dob instanceof Date) {
      formattedDob = data.dob.toISOString().split("T")[0];
    }

    // Use FormData for secure multipart transmission (supports text + physical file upload)
    const formData = new FormData();
    formData.append("aadhaar_number", (data.aadhaar_number || "").trim());
    formData.append("pancard_number", (data.pancard_number || "").trim().toUpperCase());
    formData.append("blood_group", data.blood_group || "");
    formData.append("dob", formattedDob || "");
    formData.append("contact_number", (data.contact_number || "").trim());
    formData.append("present_address", (data.present_address || "").trim());

    // Attach actual binary image file if selected (handle File, FileList, or array)
    let selectedFile = null;
    if (data.profile_pic instanceof File) {
      selectedFile = data.profile_pic;
    } else if (data.profile_pic && data.profile_pic.length > 0) {
      selectedFile = data.profile_pic[0];
    }

    if (selectedFile instanceof File) {
      formData.append("profile_pic", selectedFile);
    }

    try {
      const { data: responseData } = await api.post("/profile/basic-details", formData);
      console.log("=== Step 1: Basic Details Response ===", responseData);
      setSubmitSuccess(true);

      // Auto-advance to next step
      if (typeof nextStep === "function") {
        setTimeout(() => {
          nextStep();
        }, 600);
      }
    } catch (error) {
      console.error("Basic details submission error:", error);
      const backendMessage =
        error.response?.data?.message ||
        Object.values(error.response?.data?.errors || {})?.[0]?.[0] ||
        "Failed to save basic details. Please check the form.";
      setSubmitError(backendMessage);
    }
  };

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InformationNote />

      <FormSection
        icon="identity"
        title="Identity Information"
        description="Your institutional identity and government identification details"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <div className="min-h-[28px] mb-1.5 flex items-center">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Employee ID
              </label>
            </div>

            <input
              type="text"
              value="Auto-filled from institutional account"
              readOnly
              className="w-full h-11 px-4 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl cursor-not-allowed"
            />

            <p className="min-h-5 mt-1 flex items-center text-[10px] text-slate-400">
              Managed by institution.
            </p>
          </div>

          <InputField
            label="Aadhaar Number"
            id="aadhaar_number"
            type="text"
            inputMode="numeric"
            placeholder="Enter 12-digit Aadhaar"
            register={register}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "Aadhaar number is required",
              },
              pattern: {
                value: /^\d{12}$/,
                message: "Enter valid 12-digit Aadhaar",
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
              required: {
                value: true,
                message: "PAN number is required",
              },
              pattern: {
                value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                message: "Enter a valid PAN number",
              },
            }}
          />
        </div>
      </FormSection>

      <FormSection
        icon="personal"
        title="Personal Information"
        description="Basic personal information and official institutional photograph"
      >
        <div className="space-y-4">
          {/* Top Row: Blood Group and Date of Birth side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                required: {
                  value: true,
                  message: "Blood group is required",
                },
              }}
            />

            <InputField
              label="Date of Birth"
              id="dob"
              type="date"
              placeholder="Select date of birth"
              register={register}
              control={control}
              errors={errors}
              maxDate={new Date()}
              rules={{
                required: {
                  value: true,
                  message: "Date of birth is required",
                },
              }}
            />
          </div>

          {/* Dedicated Profile Picture Section with Rich Visual Preview */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <InputField
              label="Institutional Profile Picture"
              id="profile_pic"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              maxSizeMB={2}
              helperText="Upload a clear, front-facing formal photograph (JPG, PNG or WebP, max 2MB)."
              variant="card"
              register={register}
              errors={errors}
              rules={{
                required: {
                  value: !existingPhotoUrl,
                  message: "Please upload your official passport size photograph",
                },
                validate: {
                  hasFile: (files) => {
                    if (existingPhotoUrl) return true;
                    if (!files || files.length === 0) {
                      return "Please select a photo to upload";
                    }
                    return true;
                  },
                },
              }}
            />
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
              required: {
                value: true,
                message: "Contact number is required",
              },
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
              required: {
                value: true,
                message: "Present address is required",
              },
              minLength: {
                value: 10,
                message: "Please enter a complete address",
              },
            }}
          />
        </div>
      </FormSection>

      {submitError && (
        <div className="p-3 text-xs font-semibold text-red-700 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl flex items-center gap-2">
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="p-3 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Basic details saved successfully! Advancing to next step...
        </div>
      )}

      <StepActions 
        stepNumber={1} 
        totalSteps={7} 
        prevStep={prevStep} 
        isSubmitting={isSubmitting} 
      />
    </form>
  );
}
