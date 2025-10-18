'use client';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'date' | 'select';
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  options?: string[];
}

export default function FormField({
  label,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  options = [],
}: FormFieldProps) {
  const baseInputClass =
    'w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent transition-all';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[#0A1C56]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          className={`${baseInputClass} appearance-none cursor-pointer`}
        >
          <option value="">Pilih {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          className={baseInputClass}
        />
      )}
    </div>
  );
}
