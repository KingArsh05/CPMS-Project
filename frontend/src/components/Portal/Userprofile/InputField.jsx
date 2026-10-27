import { useEffect, useMemo, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

function ChevronDownIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CalendarIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="17" rx="2" />
      <path strokeLinecap="round" d="M16 2.5v4M8 2.5v4M3 9.5h18" />
    </svg>
  );
}

function EyeIcon({ hidden }) {
  if (hidden) {
    return (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 5.09A9.94 9.94 0 0112 4.86c5 0 8.63 4.14 9.75 5.64a2.47 2.47 0 010 2.99 15.77 15.77 0 01-4.08 3.74M6.61 6.61A15.76 15.76 0 002.25 10.5a2.47 2.47 0 000 2.99C3.37 14.99 7 19.14 12 19.14c1.16 0 2.24-.21 3.23-.57"
        />
      </svg>
    );
  }

  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12s3.5-6.25 9.75-6.25S21.75 12 21.75 12 18.25 18.25 12 18.25 2.25 12 2.25 12z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ErrorMessage({ error }) {
  return (
    <div className="min-h-5 mt-1 flex items-center">
      {error?.message ? (
        <div className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 animate-in fade-in duration-150">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="leading-tight font-medium text-[11px]">{error.message}</span>
        </div>
      ) : null}
    </div>
  );
}

function FieldLabel({ id, label, required }) {
  return (
    <div className="min-h-[28px] mb-1.5 flex items-center">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-blue-500">*</span>}
      </label>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Custom Select                                                               */
/* -------------------------------------------------------------------------- */

function SelectField({
  id,
  label,
  placeholder = "Select an option",
  options = [],
  rules,
  errors,
  register,
  control,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const formMethods = useFormContext?.();

  const { field, fieldState } = useController({
    name: id,
    control: control || register?.control || formMethods?.control,
    rules,
  });

  const error = errors?.[id] || fieldState?.error;

  const selectedOption = useMemo(
    () => options.find((option) => option.value === field.value),
    [options, field.value],
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((previous) => !previous);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${isOpen ? "z-30" : "z-10"}`}>
      <FieldLabel id={id} label={label} required={Boolean(rules?.required)} />

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        onKeyDown={handleKeyDown}
        className={`flex items-center justify-between w-full h-11 px-4 text-sm text-left bg-slate-50/40 dark:bg-slate-900 border rounded-xl transition-all focus:outline-none cursor-pointer ${
          error
            ? "border-red-500 focus:border-red-500 ring-1 ring-red-100 dark:ring-red-950/40"
            : isOpen
              ? "border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-slate-900 shadow-xs"
              : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-900"
        }`}
      >
        <span
          className={
            selectedOption
              ? "font-medium text-slate-800 dark:text-slate-100"
              : "text-slate-400"
          }
        >
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDownIcon
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl">
          <div className="max-h-60 overflow-y-auto p-1.5" role="listbox">
            {options.map((option) => {
              const isSelected = field.value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    field.onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2.5 text-sm text-left rounded-lg transition-colors ${
                    isSelected
                      ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{option.label}</span>

                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <ErrorMessage error={error} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Date Utilities                                                              */
/* -------------------------------------------------------------------------- */

function parseDate(value) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

function formatDateForInput(date) {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(value) {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return "";

  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  if (isNaN(dateObj.getTime())) return `${day}/${month}/${year}`;

  return dateObj.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isSameDate(first, second) {
  if (!first || !second) return false;

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* -------------------------------------------------------------------------- */
/* Date Picker                                                                  */
/* -------------------------------------------------------------------------- */

function DateField({
  id,
  label,
  placeholder = "Select date",
  rules,
  errors,
  register,
  control,
  maxDate,
  allowFuture = false,
}) {
  const formMethods = useFormContext?.();

  const { field, fieldState } = useController({
    name: id,
    control: control || register?.control || formMethods?.control,
    rules,
  });

  const error = errors?.[id] || fieldState?.error;

  const now = new Date();
  const effectiveMaxDate = allowFuture ? null : (maxDate || null);
  const selectedDate = parseDate(field.value);

  const [isOpen, setIsOpen] = useState(false);
  const [pickerMode, setPickerMode] = useState("calendar");

  const [visibleMonth, setVisibleMonth] = useState(
    selectedDate ? startOfMonth(selectedDate) : startOfMonth(now),
  );

  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setPickerMode("calendar");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [prevValue, setPrevValue] = useState(field.value);
  if (field.value !== prevValue) {
    setPrevValue(field.value);
    if (selectedDate) {
      setVisibleMonth(startOfMonth(selectedDate));
    }
  }

  const baseYear = allowFuture ? now.getFullYear() + 40 : now.getFullYear();
  const startYear = 1940;

  const years = Array.from(
    { length: baseYear - startYear + 1 },
    (_, index) => baseYear - index,
  );

  const months = MONTHS;

  const monthName = visibleMonth.toLocaleString("en-US", {
    month: "long",
  });

  const yearName = visibleMonth.getFullYear();

  const firstDay = startOfMonth(visibleMonth).getDay();
  const totalDays = daysInMonth(visibleMonth);

  const calendarDays = [];

  for (let index = 0; index < firstDay; index += 1) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    calendarDays.push(
      new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day),
    );
  }

  const goToPreviousMonth = () => {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      1,
    );

    if (!effectiveMaxDate || nextMonth <= startOfMonth(effectiveMaxDate)) {
      setVisibleMonth(nextMonth);
    }
  };

  const selectDate = (date) => {
    if (!date) return;
    if (effectiveMaxDate && date > effectiveMaxDate) return;

    field.onChange(formatDateForInput(date));
    setVisibleMonth(startOfMonth(date));
    setIsOpen(false);
    setPickerMode("calendar");
  };

  const selectYear = (year) => {
    const currentMonth = visibleMonth.getMonth();

    let newDate = new Date(year, currentMonth, 1);

    if (effectiveMaxDate && newDate > startOfMonth(effectiveMaxDate)) {
      newDate = new Date(effectiveMaxDate.getFullYear(), effectiveMaxDate.getMonth(), 1);
    }

    setVisibleMonth(newDate);
    setPickerMode("month");
  };

  const selectMonth = (monthIndex) => {
    const year = visibleMonth.getFullYear();

    let newDate = new Date(year, monthIndex, 1);

    if (effectiveMaxDate && newDate > startOfMonth(effectiveMaxDate)) {
      newDate = new Date(effectiveMaxDate.getFullYear(), effectiveMaxDate.getMonth(), 1);
    }

    setVisibleMonth(newDate);
    setPickerMode("calendar");
  };

  const openPicker = () => {
    setIsOpen((previous) => !previous);

    if (!isOpen) {
      setPickerMode("calendar");

      if (selectedDate) {
        setVisibleMonth(startOfMonth(selectedDate));
      }
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    field.onChange("");
  };

  return (
    <div ref={containerRef} className={`relative ${isOpen ? "z-30" : "z-10"}`}>
      <FieldLabel id={id} label={label} required={Boolean(rules?.required)} />

      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={openPicker}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={`flex items-center justify-between w-full h-11 pl-4 pr-10 text-sm text-left bg-white dark:bg-slate-900 border rounded-xl transition-all focus:outline-none cursor-pointer ${
            error
              ? "border-red-500 focus:border-red-500 ring-1 ring-red-100 dark:ring-red-950/40"
              : isOpen
                ? "border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
          }`}
        >
          <span
            className={
              field.value
                ? "font-medium text-slate-800 dark:text-slate-100"
                : "text-slate-400"
            }
          >
            {field.value ? formatDisplayDate(field.value) : placeholder}
          </span>
        </button>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1 pointer-events-none">
          {field.value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear date"
              className="pointer-events-auto p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <CalendarIcon className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 left-0 sm:left-auto sm:right-0 mt-2 w-[min(290px,calc(100vw-2rem))] p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl">
          {pickerMode === "calendar" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="flex items-center justify-center w-8 h-8 text-slate-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Previous month"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPickerMode("month")}
                    className="px-2 py-1.5 text-sm font-bold text-slate-800 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {monthName}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPickerMode("year")}
                    className="px-2 py-1.5 text-sm font-bold text-slate-800 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {yearName}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  disabled={
                    Boolean(
                      effectiveMaxDate &&
                      visibleMonth.getFullYear() === effectiveMaxDate.getFullYear() &&
                      visibleMonth.getMonth() === effectiveMaxDate.getMonth()
                    )
                  }
                  className="flex items-center justify-center w-8 h-8 text-slate-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Next month"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 010-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div
                    key={`${day}-${index}`}
                    className="flex items-center justify-center h-8 text-[10px] font-bold text-slate-400"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} className="h-8" />;
                  }

                  const disabled = Boolean(effectiveMaxDate && date > effectiveMaxDate);
                  const selected = isSameDate(date, selectedDate);
                  const isToday = isSameDate(date, now);

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      disabled={disabled}
                      onClick={() => selectDate(date)}
                      className={`flex items-center justify-center h-8 text-xs rounded-lg transition-all cursor-pointer ${
                        selected
                          ? "text-white bg-blue-600 font-bold shadow-xs shadow-blue-500/30"
                          : isToday
                            ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40 font-bold"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                      } ${disabled ? "opacity-25 cursor-not-allowed hover:bg-transparent" : ""}`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {pickerMode === "year" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setPickerMode("calendar")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  ← Back to Calendar
                </button>

                <span className="text-xs font-bold text-slate-800 dark:text-white">
                  Select Year
                </span>

                <div className="w-8" />
              </div>

              <div className="grid grid-cols-4 gap-1.5 max-h-64 overflow-y-auto pr-1">
                {years.map((year) => {
                  const selected = year === visibleMonth.getFullYear();

                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => selectYear(year)}
                      className={`h-9 text-xs rounded-lg transition-colors cursor-pointer ${
                        selected
                          ? "bg-blue-600 text-white font-bold"
                          : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {pickerMode === "month" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setPickerMode("calendar")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={() => setPickerMode("year")}
                  className="text-xs font-bold text-slate-800 dark:text-white hover:text-blue-600 cursor-pointer"
                >
                  {yearName}
                </button>

                <div className="w-8" />
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {months.map((month, index) => {
                  const selected = index === visibleMonth.getMonth();

                  const isFutureMonth =
                    Boolean(effectiveMaxDate) &&
                    yearName === effectiveMaxDate.getFullYear() &&
                    index > effectiveMaxDate.getMonth();

                  const isFutureYear =
                    Boolean(effectiveMaxDate) &&
                    yearName > effectiveMaxDate.getFullYear();

                  const disabled = isFutureMonth || isFutureYear;

                  return (
                    <button
                      key={month}
                      type="button"
                      disabled={disabled}
                      onClick={() => selectMonth(index)}
                      className={`h-9 text-xs rounded-lg transition-colors cursor-pointer ${
                        selected
                          ? "bg-blue-600 text-white font-bold"
                          : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                      } ${disabled ? "opacity-25 cursor-not-allowed" : ""}`}
                    >
                      {month.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                field.onChange("");
                setIsOpen(false);
                setPickerMode("calendar");
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => {
                field.onChange(formatDateForInput(now));
                setVisibleMonth(startOfMonth(now));
                setIsOpen(false);
                setPickerMode("calendar");
              }}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Today
            </button>
          </div>
        </div>
      )}

      <ErrorMessage error={error} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Textarea                                                                     */
/* -------------------------------------------------------------------------- */

function TextAreaField({
  id,
  label,
  placeholder,
  rows = 4,
  rules,
  errors,
  register,
}) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={Boolean(rules?.required)} />

      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...register(id, rules)}
        className={`w-full px-4 py-3 text-sm font-medium leading-6 text-slate-800 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-900 border rounded-xl resize-none placeholder:text-slate-400 focus:outline-none transition-all ${
          errors?.[id]
            ? "border-red-500 focus:border-red-500 ring-1 ring-red-100 dark:ring-red-950/40"
            : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300 dark:hover:border-slate-600 focus:bg-white dark:focus:bg-slate-900"
        }`}
      />

      <ErrorMessage error={errors?.[id]} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* File Upload                                                                 */
/* -------------------------------------------------------------------------- */

function FileUploadField({
  id,
  label,
  accept = "image/jpeg,image/png,image/webp",
  maxSizeMB = 2,
  helperText,
  rules,
  errors,
  register,
  disabled = false,
  variant = "compact",
}) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileMeta, setFileMeta] = useState(null);
  const [customError, setCustomError] = useState(null);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formMethods = useFormContext?.();

  const handleClear = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setPreviewUrl(null);
    setFileMeta(null);
    setCustomError(null);
    if (formMethods?.clearErrors) {
      formMethods.clearErrors(id);
    }
  };

  const handleFileChange = (e) => {
    setCustomError(null);
    if (formMethods?.clearErrors) {
      formMethods.clearErrors(id);
    }

    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size limit (up to maxSizeMB)
    if (file.size > maxSizeMB * 1024 * 1024) {
      const errorMsg = `File size (${formatFileSize(file.size)}) exceeds the maximum allowed limit of ${maxSizeMB}MB`;
      setCustomError(errorMsg);
      if (formMethods?.setError) {
        formMethods.setError(id, {
          type: "manual",
          message: errorMsg,
        });
      }
      e.target.value = "";
      setPreviewUrl(null);
      setFileMeta(null);
      return;
    }

    setFileMeta({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
    });

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const isRequired = Boolean(rules?.required);
  const activeError = customError ? { message: customError } : errors?.[id];

  const { ref: formRef, onChange: formOnChange, ...restRegister } = register
    ? register(id, {
        ...rules,
        validate: {
          fileSize: (files) => {
            if (!files || files.length === 0) return true;
            return (
              files[0].size <= maxSizeMB * 1024 * 1024 ||
              `File exceeds maximum allowed limit of ${maxSizeMB}MB`
            );
          },
          ...rules?.validate,
        },
      })
    : {};

  return (
    <div>
      <FieldLabel id={id} label={label} required={isRequired} />

      <input
        type="file"
        id={id}
        accept={accept}
        disabled={disabled}
        className="hidden"
        ref={(el) => {
          fileInputRef.current = el;
          if (typeof formRef === "function") formRef(el);
        }}
        onChange={(e) => {
          handleFileChange(e);
          if (formOnChange) formOnChange(e);
        }}
        {...restRegister}
      />

      {variant === "card" ? (
        /* Rich Card/Avatar Variant */
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl">
          {/* Avatar Preview Area */}
          <div className="relative group shrink-0 self-center sm:self-auto">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-300 dark:text-slate-600 flex flex-col items-center gap-1">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">No Photo</span>
                </div>
              )}
            </div>

            {previewUrl && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                title="Remove photo"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Action & Instruction Box */}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {fileMeta?.name || "Official Passport Size Photograph"}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {fileMeta
                  ? `${fileMeta.size} • Verified & ready to upload`
                  : helperText || `JPG, PNG or WebP accepted. Max ${maxSizeMB}MB.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <button
                type="button"
                onClick={() => !disabled && fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100/80 border border-blue-200/60 dark:border-blue-900/60 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                {previewUrl ? "Change Photo" : "Upload Photograph"}
              </button>

              {previewUrl && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Standard Compact Variant */
        !previewUrl && !fileMeta ? (
          <div
            onClick={() => !disabled && fileInputRef.current?.click()}
            className={`group relative flex items-center gap-3 px-3.5 h-11 border border-dashed rounded-xl cursor-pointer transition-all ${
              activeError
                ? "border-red-400 bg-red-50/20 dark:bg-red-950/10"
                : "border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50/40 dark:bg-slate-800/40 hover:bg-blue-50/20 dark:hover:bg-blue-950/20"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 transition-colors shrink-0">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>

            <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                <span>Choose photo</span>
                <span className="text-slate-400 font-normal hidden sm:inline">or browse</span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                Max {maxSizeMB}MB
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2.5 px-3 h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-7 h-7 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/60">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
              )}

              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[130px] sm:max-w-[200px]">
                  {fileMeta?.name}
                </p>
                <p className="text-[9px] text-slate-400 leading-tight">
                  {fileMeta?.size}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors cursor-pointer"
                title="Remove file"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )
      )}

      <ErrorMessage error={activeError} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Unified Score / Grading Scheme Field                                       */
/* -------------------------------------------------------------------------- */

function ScoreSchemeField({
  label = "Marking Scheme & Score",
  schemeName = "marking_scheme",
  percentageName = "percentage",
  cgpaName = "cgpa",
  errors,
  register,
  setValue,
  watch,
  required = true,
  disabled = false,
}) {
  const currentScheme = watch ? watch(schemeName) || "percentage" : "percentage";

  const handleSchemeChange = (newScheme) => {
    if (disabled || !setValue) return;
    setValue(schemeName, newScheme, { shouldValidate: true });
    if (newScheme === "percentage") {
      setValue(cgpaName, "");
    } else {
      setValue(percentageName, "");
    }
  };

  const activeError = errors?.[currentScheme === "percentage" ? percentageName : cgpaName];

  return (
    <div>
      {/* Hidden input to preserve scheme field in form data */}
      {register && <input type="hidden" {...register(schemeName)} value={currentScheme} />}

      <div className="min-h-7 mb-1.5 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[55%]">
          {label}
          {required && <span className="ml-1 text-blue-500">*</span>}
        </label>

        {/* Sleek Segmented Switcher Pill in Header */}
        <div className="inline-flex items-center shrink-0 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
          <button
            type="button"
            disabled={disabled}
            onClick={() => handleSchemeChange("percentage")}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-bold rounded-md transition-all cursor-pointer ${
              currentScheme === "percentage"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs shadow-slate-900/5 ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Percentage (%)
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => handleSchemeChange("cgpa")}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-bold rounded-md transition-all cursor-pointer ${
              currentScheme === "cgpa"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs shadow-slate-900/5 ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            CGPA (Scale 10)
          </button>
        </div>
      </div>

      {/* Input container matching standard input height h-11 */}
      <div className="relative">
        {currentScheme === "percentage" ? (
          <input
            id={percentageName}
            type="number"
            step="0.01"
            disabled={disabled}
            placeholder="Enter aggregate percentage (e.g. 84.50)"
            {...register(percentageName, {
              required: required ? { value: true, message: "Percentage score is required" } : false,
              min: { value: 1, message: "Percentage must be > 0" },
              max: { value: 100, message: "Percentage cannot exceed 100" },
            })}
            className={`w-full h-11 pl-4 pr-12 text-sm font-medium text-slate-800 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-900 border rounded-xl placeholder:text-slate-400 focus:outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${
              activeError
                ? "border-red-500 focus:border-red-500 ring-1 ring-red-100 dark:ring-red-950/40"
                : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300 dark:hover:border-slate-600 focus:bg-white dark:focus:bg-slate-900"
            }`}
          />
        ) : (
          <input
            id={cgpaName}
            type="number"
            step="0.01"
            disabled={disabled}
            placeholder="Enter obtained CGPA (e.g. 8.75)"
            {...register(cgpaName, {
              required: required ? { value: true, message: "CGPA score is required" } : false,
              min: { value: 1, message: "CGPA must be > 0" },
              max: { value: 10, message: "CGPA cannot exceed 10.0" },
            })}
            className={`w-full h-11 pl-4 pr-16 text-sm font-medium text-slate-800 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-900 border rounded-xl placeholder:text-slate-400 focus:outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${
              activeError
                ? "border-red-500 focus:border-red-500 ring-1 ring-red-100 dark:ring-red-950/40"
                : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300 dark:hover:border-slate-600 focus:bg-white dark:focus:bg-slate-900"
            }`}
          />
        )}

        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-slate-400 pointer-events-none select-none">
          {currentScheme === "percentage" ? "%" : "/ 10.0"}
        </div>
      </div>

      <ErrorMessage error={activeError} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main InputField                                                             */
/* -------------------------------------------------------------------------- */

export default function InputField({
  label,
  id,
  type = "text",
  register,
  control,
  setValue,
  watch,
  inputMode,
  rules,
  errors,
  placeholder,
  icon,
  options = [],
  rows = 4,
  maxDate,
  disabled = false,
  accept,
  maxSizeMB = 2,
  helperText,
  variant = "compact",
  allowFuture = false,
  schemeName,
  percentageName,
  cgpaName,
  required,
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "score") {
    return (
      <ScoreSchemeField
        label={label}
        schemeName={schemeName}
        percentageName={percentageName}
        cgpaName={cgpaName}
        errors={errors}
        register={register}
        setValue={setValue}
        watch={watch}
        required={required ?? Boolean(rules?.required)}
        disabled={disabled}
      />
    );
  }

  if (type === "file") {
    return (
      <FileUploadField
        id={id}
        label={label}
        accept={accept}
        maxSizeMB={maxSizeMB}
        helperText={helperText}
        variant={variant}
        rules={rules}
        errors={errors}
        register={register}
        disabled={disabled}
      />
    );
  }

  if (type === "select") {
    return (
      <SelectField
        id={id}
        label={label}
        placeholder={placeholder}
        options={options}
        rules={rules}
        errors={errors}
        register={register}
        control={control}
      />
    );
  }

  if (type === "date") {
    return (
      <DateField
        id={id}
        label={label}
        placeholder={placeholder}
        rules={rules}
        errors={errors}
        register={register}
        control={control}
        maxDate={maxDate}
        allowFuture={allowFuture}
      />
    );
  }

  if (type === "textarea") {
    return (
      <TextAreaField
        id={id}
        label={label}
        placeholder={placeholder}
        rows={rows}
        rules={rules}
        errors={errors}
        register={register}
      />
    );
  }

  const inputType = type === "password" && showPassword ? "text" : type;

  const error = errors?.[id];

  return (
    <div>
      <FieldLabel id={id} label={label} required={Boolean(rules?.required)} />

      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
            {icon}
          </span>
        )}

        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          inputMode={inputMode}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          {...register(id, rules)}
          className={`w-full h-11 px-4 text-sm font-medium text-slate-800 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-900 border rounded-xl placeholder:text-slate-400 focus:outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${
            icon ? "pl-10" : ""
          } ${type === "password" ? "pr-11" : ""} ${
            error
              ? "border-red-500 focus:border-red-500 ring-1 ring-red-100 dark:ring-red-950/40"
              : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300 dark:hover:border-slate-600 focus:bg-white dark:focus:bg-slate-900"
          }`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <EyeIcon hidden={showPassword} />
          </button>
        )}
      </div>

      <ErrorMessage error={error} />
    </div>
  );
}
