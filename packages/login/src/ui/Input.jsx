export function Input({ label, name, ...props }) {
  return (
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor={name}>
      {label}
      <input
        className="mt-1.5 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-900 dark:disabled:bg-gray-900"
        id={name}
        name={name}
        {...props}
      />
    </label>
  );
}
