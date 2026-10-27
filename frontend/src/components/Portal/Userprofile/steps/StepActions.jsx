
export default function StepActions({
  stepNumber = 1,
  totalSteps = 6,
  prevStep,
  isSubmitting = false,
  saveButtonText,
  isOptional = false,
  onSkip,
}) {
  const isFirstStep = stepNumber === 1;
  const isLastStep = stepNumber === totalSteps;

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-5 mt-6 border-t border-slate-100 dark:border-slate-800">
      <button
        type="button"
        onClick={() => prevStep && prevStep()}
        disabled={isFirstStep}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/80 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M17 10a1 1 0 01-1 1H6.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L6.414 9H16a1 1 0 011 1z"
            clipRule="evenodd"
          />
        </svg>
        Previous
      </button>

      <div className="flex items-center gap-2.5 self-end sm:self-auto">
        {isOptional && onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl active:scale-[0.98] transition-all cursor-pointer"
          >
            {isLastStep ? "Skip & Finish" : "Skip this Step"}
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 rounded-xl shadow-xs shadow-blue-500/25 hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {isSubmitting ? (
            "Saving..."
          ) : (
            <>
              {saveButtonText || (isLastStep ? "Complete Profile" : "Save & Next")}
              {!isLastStep && (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 1.414L13.586 11H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
