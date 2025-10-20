'use client';

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
}

export default function TextAreaField({
  label,
  placeholder,
  required = false,
  value,
  onChange,
  rows = 6,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-lg font-bold text-[#0A1C56]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent transition-all resize-none shadow-sm"
      />
    </div>
  );
}
