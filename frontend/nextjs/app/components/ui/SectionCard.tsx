import { ReactNode } from "react";

type SectionCardProps = {
  title?: string;
  headerRight?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function SectionCard({
  title,
  headerRight,
  children,
  footer,
  className = "",
}: SectionCardProps) {
  return (
    <div className={`card shadow-sm border-light mb-4 ${className}`}>
      {(title || headerRight) && (
        <div className="card-header bg-transparent d-flex justify-content-between align-items-center py-3 border-light">
          {title && <h3 className="card-title h5 mb-0 text-dark fw-bold">{title}</h3>}
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer bg-transparent py-3 border-light">{footer}</div>}
    </div>
  );
}
