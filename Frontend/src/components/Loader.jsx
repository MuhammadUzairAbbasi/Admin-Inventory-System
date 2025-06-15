export default function Loader({
  size = "md",
  label = "Loading...",
  fullScreen = false,
}) {
  const sizeClass =
    {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    }[size] || "h-6 w-6";

  const containerClass = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white/70 z-50"
    : "flex flex-col items-center justify-center py-6";

  return (
    <div className={containerClass}>
      <svg
        className={`animate-spin text-blue-600 ${sizeClass}`}
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
      {label && <span className="mt-2 text-sm text-gray-600">{label}</span>}
    </div>
  );
}
