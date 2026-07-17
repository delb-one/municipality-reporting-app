type EmptyStateProps = {
  title?: string;
  message: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  title = "Nessun dato trovato",
  message,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-5 px-4 bg-light rounded border border-light-subtle d-flex flex-column align-items-center mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="currentColor"
        className="text-secondary opacity-50 mb-3"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
      <h4 className="h5 text-dark fw-bold mb-1">{title}</h4>
      <p className="text-secondary small mb-3" style={{ maxWidth: "320px" }}>
        {message}
      </p>
      {action}
    </div>
  );
}
