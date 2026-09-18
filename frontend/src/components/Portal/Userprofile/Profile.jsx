import React, { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import BasicDetails from "./steps/BasicDetails";

const STEPS = [
  {
    id: 1,
    title: "Basic Details",
    mobileTitle: "Basic",
    description: "Personal, identity and contact information",
    required: true,
  },
  {
    id: 2,
    title: "Professional Details",
    mobileTitle: "Professional",
    description: "Joining, service and employment information",
    required: true,
  },
  {
    id: 3,
    title: "Secondary Education",
    mobileTitle: "Secondary",
    description: "10th standard academic information",
    required: true,
  },
  {
    id: 4,
    title: "Undergraduate Education",
    mobileTitle: "UG",
    description: "Graduation and undergraduate qualification",
    required: true,
  },
  {
    id: 5,
    title: "Postgraduate Education",
    mobileTitle: "PG",
    description: "Postgraduate qualification details",
    required: false,
  },
  {
    id: 6,
    title: "Doctorate",
    mobileTitle: "PhD",
    description: "Doctoral qualification details",
    required: false,
  },
];

function UserIcon() {
  return (
    <svg
      className="w-5 h-5"
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

function BriefcaseIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2"
      />
    </svg>
  );
}

function AcademicIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5L12 5l9 4.5L12 14 3 9.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12v4.5c3.5 2.5 8.5 2.5 12 0V12M21 10v5"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.704 5.296a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M17 10a1 1 0 01-1 1H6.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L6.414 9H16a1 1 0 011 1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M3 10a1 1 0 011-1h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 1.414L13.586 11H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function getStepIcon(stepId) {
  if (stepId === 1) return <UserIcon />;
  if (stepId === 2) return <BriefcaseIcon />;
  return <AcademicIcon />;
}

function renderStep(currentStep) {
  switch (currentStep) {
    case 1:
      return <BasicDetails />;

    default:
      return null;
  }
}

export default function Profile() {
  const { user } = useAuth();

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const activeStep = STEPS[currentStep - 1];
  const requiredSteps = STEPS.filter((step) => step.required);

  const completedRequiredSteps = useMemo(() => {
    return requiredSteps.filter((step) => completedSteps.includes(step.id))
      .length;
  }, [completedSteps]);

  const completionPercentage = Math.round(
    (completedRequiredSteps / requiredSteps.length) * 100,
  );

  const markCurrentStepCompleted = () => {
    setCompletedSteps((previous) =>
      previous.includes(currentStep) ? previous : [...previous, currentStep],
    );
  };

  const handleNext = () => {
    markCurrentStepCompleted();

    if (currentStep < STEPS.length) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  const handleSkip = () => {
    if (!activeStep.required && currentStep < STEPS.length) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  const handleStepClick = (stepId) => {
    const previousStepCompleted = completedSteps.includes(stepId - 1);

    if (stepId === 1 || stepId <= currentStep || previousStepCompleted) {
      setCurrentStep(stepId);
    }
  };

  const handleSubmit = (data) => {
    console.log("Profile submitted:", data);
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        {/* PAGE HEADER */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                  GNDEC Faculty Management
                </span>

                <span className="text-slate-400 text-xs">•</span>

                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Faculty Profile
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Complete Your Profile
              </h1>

              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                Complete your personal, professional and academic information to
                maintain an accurate institutional profile.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 p-4 rounded-xl shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <UserIcon />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Profile Completion
                </span>

                <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {completionPercentage}% Complete
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS STEPPER */}
        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Profile Setup
              </span>

              <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                Step {currentStep} of {STEPS.length}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Required Sections
              </span>

              <p className="mt-0.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                {completedRequiredSteps} of {requiredSteps.length} completed
              </p>
            </div>
          </div>

          {/* DESKTOP STEPPER */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute left-[8.33%] right-[8.33%] top-5 h-px bg-slate-200 dark:bg-slate-800" />

              <div
                className="absolute left-[8.33%] top-5 h-px bg-blue-600 transition-all duration-500"
                style={{
                  width: `${((currentStep - 1) / (STEPS.length - 1)) * 83.34}%`,
                }}
              />

              <div className="relative grid grid-cols-6">
                {STEPS.map((step) => {
                  const isCurrent = currentStep === step.id;
                  const isCompleted = completedSteps.includes(step.id);
                  const isAccessible =
                    step.id <= currentStep ||
                    completedSteps.includes(step.id - 1);

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isAccessible}
                      className={`flex flex-col items-center text-center ${
                        isAccessible ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                    >
                      <div
                        className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                          isCompleted
                            ? "bg-blue-600 border-blue-600 text-white"
                            : isCurrent
                              ? "bg-white dark:bg-slate-900 border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.15)]"
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckIcon />
                        ) : (
                          <span className="text-xs font-bold">{step.id}</span>
                        )}
                      </div>

                      <span
                        className={`mt-2 text-xs font-bold ${
                          isCurrent
                            ? "text-blue-600 dark:text-blue-400"
                            : isCompleted
                              ? "text-slate-800 dark:text-slate-200"
                              : "text-slate-400"
                        }`}
                      >
                        {step.title}
                      </span>

                      <span className="mt-0.5 text-[10px] text-slate-400">
                        {step.required ? "Required" : "Optional"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE STEPPER */}
          <div className="md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center shrink-0 w-10 h-10 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 rounded-xl">
                {currentStep}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {activeStep.title}
                  </span>

                  <span className="text-[10px] font-semibold text-slate-400">
                    {currentStep} / {STEPS.length}
                  </span>
                </div>

                <div className="w-full h-1.5 overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${(currentStep / STEPS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* REQUIRED PROGRESS */}
          <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Required profile progress
              </span>

              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {completionPercentage}%
              </span>
            </div>

            <div className="w-full h-1.5 overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* CURRENT STEP FORM */}
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <div className="overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xs">
            {/* FORM HEADER */}
            <div className="flex flex-col gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 md:flex-row md:items-center md:justify-between md:px-7">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center shrink-0 w-10 h-10 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-xl">
                  {getStepIcon(activeStep.id)}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                      {activeStep.title}
                    </h2>

                    <span
                      className={`px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-md ${
                        activeStep.required
                          ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {activeStep.required ? "Required" : "Optional"}
                    </span>
                  </div>

                  <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {activeStep.description}
                  </p>
                </div>
              </div>

              <span className="self-start px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 rounded-lg md:self-auto">
                Section {currentStep}
              </span>
            </div>

            {/* ACTUAL STEP COMPONENT */}
            <div className="px-6 py-6 md:px-7 md:py-7">
              {renderStep(currentStep)}
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col-reverse gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 sm:flex-row sm:items-center sm:justify-between md:px-7">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ArrowLeftIcon />
                Previous
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                {!activeStep.required && (
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    Skip for Now
                  </button>
                )}

                {currentStep < STEPS.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 rounded-xl shadow-xs hover:bg-blue-700 active:bg-blue-800 transition-all cursor-pointer"
                  >
                    Save & Continue
                    <ArrowRightIcon />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 rounded-xl shadow-xs hover:bg-blue-700 active:bg-blue-800 transition-all cursor-pointer"
                  >
                    Complete Profile
                    <CheckIcon />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* FOOTER */}
        <div className="flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-400">
            Logged in as {user?.name || "Faculty Member"}
          </p>

          <p className="text-[11px] text-slate-400">
            Required sections must be completed before profile submission.
          </p>
        </div>
      </div>
    </FormProvider>
  );
}
