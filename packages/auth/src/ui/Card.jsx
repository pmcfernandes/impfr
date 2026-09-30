export function Card({ className = "", children }) {
  return (
    <section className={`w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-8 ${className}`}>
      {children}
    </section>
  );
}
