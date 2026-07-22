import { ReactNode } from "react";

type StatsCardProps = {
  label: string;
  value: string | number;
  accentColor?: string;
  icon?: ReactNode;
};

export default function StatsCard({
  label,
  value,
  accentColor = "#003366",
  icon,
}: StatsCardProps) {
  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{ borderRadius: 12, borderLeft: `4px solid ${accentColor}` }}
    >
      <div className="card-body p-4 d-flex align-items-start gap-3">
        {icon && (
          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: 48,
              height: 48,
              backgroundColor: `${accentColor}18`,
              color: accentColor,
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <p className="text-muted small fw-semibold text-uppercase mb-1">{label}</p>
          <p className="fw-bold mb-0 text-dark" style={{ fontSize: "1.75rem", lineHeight: 1.1 }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
