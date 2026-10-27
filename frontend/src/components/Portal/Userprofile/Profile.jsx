import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import BasicDetails from "./steps/BasicDetails";
import ProfessionalDetails from "./steps/ProfessionalDetails";
import SecondaryEducation from "./steps/SecondaryEducation";
import HigherSecondaryEducation from "./steps/HigherSecondaryEducation";
import UndergraduateEducation from "./steps/UndergraduateEducation";
import PostgraduateEducation from "./steps/PostgraduateEducation";
import DoctorateEducation from "./steps/DoctorateEducation";

const STEPS = [
  {
    id: 1,
    title: "Basic Details",
    subtitle: "Personal, contact & identity",
    required: true,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 21a8 8 0 00-16 0M12 13a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Professional Details",
    subtitle: "Service & designation",
    required: true,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Secondary Education",
    subtitle: "10th standard qualification",
    required: true,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Higher Secondary (12th)",
    subtitle: "10+2 / Diploma records",
    required: true,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Undergraduate (UG)",
    subtitle: "Bachelor's degree records",
    required: true,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 5l9 4.5L12 14 3 9.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v4.5c3.5 2.5 8.5 2.5 12 0V12M21 10v5" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Postgraduate (PG)",
    subtitle: "Master's degree records",
    required: false,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Doctorate (PhD)",
    subtitle: "Doctoral research details",
    required: false,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0H9.497m5.003 0a2.25 2.25 0 002.25-2.25v-.872c0-.51-.345-.953-.842-1.066l-3.376-.772a2.25 2.25 0 00-1.004 0l-3.376.772a1.084 1.084 0 00-.842 1.066v.872a2.25 2.25 0 002.25 2.25" />
      </svg>
    ),
  },
];

export default function Profile() {
  const { user } = useAuth();
  const methods = useForm({
    mode: "onChange",
  });

  const [step, setStep] = useState(1);

  const nextStep = (increment = 1) => {
    setStep((s) => Math.min(s + increment, STEPS.length));
  };

  const prevStep = (decrement = 1) => {
    setStep((s) => Math.max(s - decrement, 1));
  };

  // Required steps count (steps 1 to 4)
  const requiredSteps = STEPS.filter((s) => s.required);
  const completedRequiredSteps = Math.min(step - 1, requiredSteps.length);
  const progressPercent = Math.round(
    (completedRequiredSteps / requiredSteps.length) * 100
  );

  const activeStep = STEPS[step - 1];

  return (
    <FormProvider {...methods}>
      <div className="w-full space-y-4">
        {/* TOP SECTION: Header Banner with Progress Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                  GNDEC Faculty Management
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Faculty Institutional Records
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeStep?.title}
                </h1>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md ${
                    activeStep?.required
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {activeStep?.required ? "Required Section" : "Optional Section"}
                </span>
              </div>
            </div>

            {/* Quick Stat Pill */}
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 px-4 py-2 rounded-xl shrink-0 self-start sm:self-auto">
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Mandatory Progress
                </span>
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  {completedRequiredSteps} of {requiredSteps.length} Required ({progressPercent}%)
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs shadow-blue-500/25">
                {step}/{STEPS.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              <span>Required Sections Completion</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{progressPercent}% Completed</span>
            </div>
            
            <div className="relative w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out shadow-xs shadow-blue-500/40"
                style={{ width: `${Math.max(progressPercent, 4)}%` }}
              />
            </div>

            {/* Step Segments */}
            <div className="grid grid-cols-7 gap-1.5 mt-2">
              {STEPS.map((s) => {
                const isPassed = step > s.id;
                const isCurrent = step === s.id;
                return (
                  <div key={s.id} className="flex flex-col gap-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        isPassed
                          ? "bg-blue-600 dark:bg-blue-500"
                          : isCurrent
                          ? "bg-blue-400 dark:bg-blue-600 animate-pulse"
                          : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    />
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-[9px] font-medium truncate hidden md:block ${
                          isCurrent
                            ? "text-blue-600 dark:text-blue-400 font-bold"
                            : isPassed
                            ? "text-slate-600 dark:text-slate-300"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {s.title}
                      </span>
                      {!s.required && (
                        <span className="text-[8px] text-slate-400 hidden xl:inline">
                          (opt)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: 30% Stepper Sidebar + 70% Step Details Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* 30% Vertical Stepper Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-3 sm:p-4 shadow-2xs lg:sticky lg:top-4">
            <div className="px-2 pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Verification Steps
              </span>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                5 Required • 2 Optional
              </p>
            </div>

            <nav className="space-y-1.5" aria-label="Steps">
              {STEPS.map((s) => {
                const isActive = step === s.id;
                const isPast = step > s.id;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStep(s.id)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer relative overflow-hidden ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-500 font-semibold"
                        : isPast
                        ? "bg-blue-50/50 dark:bg-blue-950/20 text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 inset-y-0 w-1 bg-white rounded-r-full" />
                    )}

                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                        isActive
                          ? "bg-white/20 text-white shadow-2xs"
                          : isPast
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {isPast ? (
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        s.id
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-slate-800 dark:text-slate-200"}`}>
                          {s.title}
                        </p>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase ${
                            isActive
                              ? "bg-white/25 text-white"
                              : s.required
                              ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          }`}
                        >
                          {s.required ? "Req" : "Opt"}
                        </span>
                      </div>
                      <p className={`text-[10px] truncate mt-0.5 ${isActive ? "text-blue-100" : "text-slate-400"}`}>
                        {s.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 70% Form Canvas */}
          <div className="lg:col-span-8 xl:col-span-9 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-2xs">
            {step === 1 && (
              <BasicDetails
                nextStep={nextStep}
                prevStep={prevStep}
                setStep={setStep}
              />
            )}
            {step === 2 && (
              <ProfessionalDetails
                nextStep={nextStep}
                prevStep={prevStep}
                setStep={setStep}
              />
            )}
            {step === 3 && (
              <SecondaryEducation
                nextStep={nextStep}
                prevStep={prevStep}
                setStep={setStep}
              />
            )}
            {step === 4 && (
              <HigherSecondaryEducation
                nextStep={nextStep}
                prevStep={prevStep}
                setStep={setStep}
              />
            )}
            {step === 5 && (
              <UndergraduateEducation
                nextStep={nextStep}
                prevStep={prevStep}
                setStep={setStep}
              />
            )}
            {step === 6 && (
              <PostgraduateEducation
                nextStep={nextStep}
                prevStep={prevStep}
                setStep={setStep}
              />
            )}
            {step === 7 && (
              <DoctorateEducation
                nextStep={nextStep}
                prevStep={prevStep}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
