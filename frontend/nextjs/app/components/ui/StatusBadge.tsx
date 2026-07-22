import { Status } from "../../types";

type StatusBadgeProps = {
  status: Status;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className="badge text-white"
      style={{
        backgroundColor: status.color || "#6c757d",
        padding: "0.4em 0.8em",
        borderRadius: "4px",
        fontWeight: "bold",
        fontSize: "0.85rem",
        display: "inline-block",
      }}
    >
      {status.name}
    </span>
  );
}
