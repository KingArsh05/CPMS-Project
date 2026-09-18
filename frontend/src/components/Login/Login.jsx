import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import InputField from "./FormControl";

export default function Login({ onSuccess }) {
  const { login } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const [backendError, setBackendError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      college_email_id: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setBackendError("");
    setIsSubmitting(true);

    try {
      await login({
        college_email_id: data.college_email_id.trim(),
        password: data.password,
      });

      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (err) {
      setValue("password", "");

      const status = err.response?.status;
      const responseData = err.response?.data;

      if (status === 422) {
        if (responseData?.errors?.college_email_id) {
          setBackendError(responseData.errors.college_email_id[0]);
        } else if (responseData?.errors?.password) {
          setBackendError(responseData.errors.password[0]);
        } else if (responseData?.message) {
          setBackendError(responseData.message);
        } else {
          setBackendError("Invalid email or password.");
        }
      } else if (status === 419) {
        setBackendError("Session expired. Please try signing in again.");
      } else if (status === 401) {
        setBackendError("Invalid email or password.");
      } else if (status === 403) {
        setBackendError("Your account does not have permission to log in.");
      } else if (!err.response) {
        setBackendError("Unable to connect to the server. Please try again.");
      } else {
        setBackendError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-100 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 relative overflow-hidden select-none">
      {/* Subtle Ambient Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header Controls: Theme Toggle Button */}
      <div className="absolute top-5 right-5 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm cursor-pointer"
        >
          {darkMode ? (
            /* Sun Icon when in Dark Mode */
            <svg
              className="w-4 h-4 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
              />
            </svg>
          ) : (
            /* Moon Icon when in Light Mode */
            <svg
              className="w-4 h-4 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Main Authentication Card */}
      <div className="relative w-full max-w-[400px] z-10">
        <div className="bg-white/95 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-black/70">
          
          {/* Header Identity with Official GNDEC Crest */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-white shadow-sm mb-2.5 border border-slate-100 dark:border-slate-700/50">
              <img
                src="/gndec-logo.png"
                alt="Guru Nanak Dev Engineering College Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Faculty & Staff Portal
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              Guru Nanak Dev Engineering College
            </p>
            <span className="inline-block mt-1 text-[10px] uppercase font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/60">
              Performance Management System
            </span>
          </div>

          {/* Reserved Compact Slot for Backend Error: 36px height, smaller alert */}
          <div className="min-h-[36px] mb-2 flex items-center">
            {backendError ? (
              <div
                role="alert"
                className="w-full p-2 rounded-xl text-[11px] bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 flex items-start gap-1.5 animate-fadeIn"
              >
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="leading-tight">{backendError}</span>
              </div>
            ) : null}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-0.5">
            {/* College Email Input */}
            <InputField
              id="college_email_id"
              label="College Email"
              type="email"
              placeholder="e.g. faculty@gndec.ac.in"
              register={register}
              rules={{
                required: "College Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid college email address.",
                },
              }}
              errors={errors}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            {/* Password Input */}
            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              showEye={true}
              register={register}
              rules={{
                required: "Password is required.",
              }}
              errors={errors}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            {/* Submit Button with Dynamic Gradient & Specular Highlights */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full overflow-hidden py-3 px-5 rounded-xl font-semibold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer select-none
                  ${
                    isSubmitting
                      ? "bg-blue-600/70 cursor-not-allowed shadow-none"
                      : "bg-linear-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] hover:bg-right shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-indigo-500/35 active:scale-[0.985] border border-white/15"
                  }`}
              >
                {/* Subtle Inner Glass Ambient Sheen */}
                <span className="absolute inset-x-0 top-0 h-[1px] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span className="tracking-wide">Sign In</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.2"
                        d="M13.5 4.5L20.25 12m0 0l-6.75 7.5M20.25 12H3.75"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Institutional Note: Tight compact margin */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Authorized access only. Technical issues? Contact Establishment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
