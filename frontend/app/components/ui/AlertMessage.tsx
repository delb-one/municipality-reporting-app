type AlertMessageProps = {
  type: "success" | "danger" | "warning" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
};

export default function AlertMessage({
  type,
  title,
  message,
  onClose,
}: AlertMessageProps) {
  return (
    <div className={`alert alert-${type} ${onClose ? "alert-dismissible" : ""} fade show`} role="alert">
      {title && <strong className="d-block mb-1">{title}</strong>}
      <div>{message}</div>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Chiudi"
          onClick={onClose}
        ></button>
      )}
    </div>
  );
}
