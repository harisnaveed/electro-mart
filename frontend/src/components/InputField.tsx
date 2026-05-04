type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="text-xs font-semibold text-secondary dark:text-gray-400">
        {label} {required && "*"}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="
          mt-2 h-11 w-full rounded-xl bg-zinc-50 px-4
          text-sm font-semibold text-zinc-900
          outline-none ring-1 ring-zinc-200
          focus:ring-2 focus:ring-orange-300
          dark:bg-gray-900 dark:text-zinc-500
          dark:ring-zinc-800 dark:focus:ring-gray-700
        "
      />
    </div>
  );
}
