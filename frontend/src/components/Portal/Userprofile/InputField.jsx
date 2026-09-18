import { useEffect, useMemo, useRef, useState } from "react";
import { useController } from "react-hook-form";

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
  if (!error) {
    return <div className="min-h-4 mt-1.5" />;
  }

  return (
    <div className="min-h-4 mt-1.5">
      <p className="flex items-center gap-1 text-[10px] leading-4 text-red-500">
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
        {error.message}
      </p>
    </div>
  );
}

function FieldLabel({ id, label, required }) {
  return (
    <label
      htmlFor={id}
      className="block mb-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
    >
      {label}
      {required && <span className="ml-1 text-blue-500">*</span>}
    </label>
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
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const { field } = useController({
    name: id,
    control: register?.control,
    rules,
  });

  const error = errors?.[id];

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
    <div ref={containerRef} className="relative">
      <FieldLabel id={id} label={label} required={Boolean(rules?.required)} />

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        onKeyDown={handleKeyDown}
        className={`flex items-center justify-between w-full h-11 px-4 text-sm text-left bg-white dark:bg-slate-900 border rounded-xl transition-colors focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : isOpen
              ? "border-blue-500 ring-1 ring-blue-100 dark:ring-blue-950/40"
              : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
      >
        <span
          className={
            selectedOption
              ? "text-slate-700 dark:text-slate-200"
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
  if (!value) return "dd/mm/yyyy";

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) return "dd/mm/yyyy";

  return `${day}/${month}/${year}`;
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

/* -------------------------------------------------------------------------- */
/* Date Picker                                                                  */
/* -------------------------------------------------------------------------- */

function DateField({
  id,
  label,
  placeholder = "dd/mm/yyyy",
  rules,
  errors,
  register,
  maxDate,
}) {
  const { field } = useController({
    name: id,
    control: register?.control,
    rules,
  });

  const today = maxDate || new Date();
  const selectedDate = parseDate(field.value);

  const [isOpen, setIsOpen] = useState(false);
  const [pickerMode, setPickerMode] = useState("calendar");

  const [visibleMonth, setVisibleMonth] = useState(
    selectedDate ? startOfMonth(selectedDate) : startOfMonth(today),
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

  useEffect(() => {
    if (selectedDate) {
      setVisibleMonth(startOfMonth(selectedDate));
    }
  }, [field.value]);

  const currentYear = today.getFullYear();

  const years = useMemo(() => {
    return Array.from(
      { length: currentYear - 1900 + 1 },
      (_, index) => currentYear - index,
    );
  }, [currentYear]);

  const months = useMemo(
    () => [
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
    ],
    [],
  );

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

    if (nextMonth <= startOfMonth(today)) {
      setVisibleMonth(nextMonth);
    }
  };

  const selectDate = (date) => {
    if (!date || date > today) return;

    field.onChange(formatDateForInput(date));
    setVisibleMonth(startOfMonth(date));
    setIsOpen(false);
    setPickerMode("calendar");
  };

  const selectYear = (year) => {
    const currentMonth = visibleMonth.getMonth();

    let newDate = new Date(year, currentMonth, 1);

    if (newDate > startOfMonth(today)) {
      newDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }

    setVisibleMonth(newDate);
    setPickerMode("month");
  };

  const selectMonth = (monthIndex) => {
    const year = visibleMonth.getFullYear();

    let newDate = new Date(year, monthIndex, 1);

    if (newDate > startOfMonth(today)) {
      newDate = new Date(today.getFullYear(), today.getMonth(), 1);
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

  return (
    <div ref={containerRef} className="relative">
      <FieldLabel id={id} label={label} required={Boolean(rules?.required)} />

      <button
        id={id}
        type="button"
        onClick={openPicker}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`flex items-center justify-between w-full h-11 px-4 text-sm text-left bg-white dark:bg-slate-900 border rounded-xl transition-colors focus:outline-none ${
          errors?.[id]
            ? "border-red-500 focus:border-red-500"
            : isOpen
              ? "border-blue-500 ring-1 ring-blue-100 dark:ring-blue-950/40"
              : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
      >
        <span
          className={
            field.value
              ? "text-slate-700 dark:text-slate-200"
              : "text-slate-400"
          }
        >
          {field.value ? formatDisplayDate(field.value) : placeholder}
        </span>

        <CalendarIcon className="w-4 h-4 text-slate-500" />
      </button>

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
                    visibleMonth.getFullYear() === today.getFullYear() &&
                    visibleMonth.getMonth() === today.getMonth()
                  }
                  className="flex items-center justify-center w-8 h-8 text-slate-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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

                  const disabled = date > today;
                  const selected = isSameDate(date, selectedDate);
                  const isToday = isSameDate(date, today);

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      disabled={disabled}
                      onClick={() => selectDate(date)}
                      className={`flex items-center justify-center h-8 text-xs rounded-lg transition-colors ${
                        selected
                          ? "text-white bg-blue-600 font-semibold"
                          : isToday
                            ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40 font-semibold"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
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
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Back
                </button>

                <span className="text-sm font-bold text-slate-800 dark:text-white">
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
                      className={`h-9 text-xs rounded-lg transition-colors ${
                        selected
                          ? "bg-blue-600 text-white font-semibold"
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
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setPickerMode("year")}
                  className="text-sm font-bold text-slate-800 dark:text-white hover:text-blue-600"
                >
                  {yearName}
                </button>

                <div className="w-8" />
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {months.map((month, index) => {
                  const selected = index === visibleMonth.getMonth();

                  const isFutureMonth =
                    yearName === today.getFullYear() &&
                    index > today.getMonth();

                  const isFutureYear = yearName > today.getFullYear();

                  const disabled = isFutureMonth || isFutureYear;

                  return (
                    <button
                      key={month}
                      type="button"
                      disabled={disabled}
                      onClick={() => selectMonth(index)}
                      className={`h-9 text-xs rounded-lg transition-colors ${
                        selected
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                      } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
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
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => {
                field.onChange(formatDateForInput(today));
                setVisibleMonth(startOfMonth(today));
                setIsOpen(false);
                setPickerMode("calendar");
              }}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
            >
              Today
            </button>
          </div>
        </div>
      )}

      <ErrorMessage error={errors?.[id]} />
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
        className={`w-full px-4 py-3 text-sm leading-6 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border rounded-xl resize-none placeholder:text-slate-400 focus:outline-none focus:ring-0 transition-colors ${
          errors?.[id]
            ? "border-red-500 focus:border-red-500"
            : "border-slate-200 dark:border-slate-700 focus:border-blue-500 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
      />

      <ErrorMessage error={errors?.[id]} />
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
  inputMode,
  rules,
  errors,
  placeholder,
  icon,
  options = [],
  rows = 4,
  maxDate,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

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
        maxDate={maxDate}
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
          className={`w-full h-11 px-4 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-0 transition-colors disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${
            icon ? "pl-10" : ""
          } ${type === "password" ? "pr-11" : ""} ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-200 dark:border-slate-700 focus:border-blue-500 hover:border-slate-300 dark:hover:border-slate-600"
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
