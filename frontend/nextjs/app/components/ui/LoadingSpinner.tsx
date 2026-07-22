type LoadingSpinnerProps = {
  message?: string;
  size?: "sm" | "md" | "lg";
};

export default function LoadingSpinner({
  message = "Caricamento in corso...",
  size = "md",
}: LoadingSpinnerProps) {
  const spinnerSizeClass = size === "sm" ? "spinner-border-sm" : "";
  const sizeStyle = size === "lg" ? { width: "3rem", height: "3rem" } : undefined;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5 w-100">
      <div
        className={`spinner-border text-primary ${spinnerSizeClass}`}
        role="status"
        style={sizeStyle}
      >
        <span className="visually-hidden">{message}</span>
      </div>
      {message && <p className="mt-3 text-muted font-monospace small">{message}</p>}
    </div>
  );
}
