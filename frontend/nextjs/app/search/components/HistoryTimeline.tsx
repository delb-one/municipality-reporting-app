import { ReportHistory } from "../../types";
import StatusBadge from "../../components/ui/StatusBadge";

type HistoryTimelineProps = {
  histories: ReportHistory[];
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function HistoryTimeline({ histories }: HistoryTimelineProps) {
  if (histories.length === 0) {
    return (
      <p className="text-secondary small mb-0">
        Nessun aggiornamento registrato per questa segnalazione.
      </p>
    );
  }

  const accordionId = "history-timeline-accordion";

  return (
    <div className="it-timeline-wrapper">
      <div className="accordion" id={accordionId}>
        {histories.map((entry, index) => {
          const headingId = `history-heading-${entry.id}`;
          const collapseId = `history-collapse-${entry.id}`;
          const isLatest = index === histories.length - 1;

          return (
            <div
              key={entry.id}
              className="accordion-item border mb-2"
              style={{ borderRadius: 8, overflow: "hidden" }}
            >
              <h3 className="accordion-header" id={headingId}>
                <button
                  className={`accordion-button fw-semibold ${isLatest ? "" : "collapsed"}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded={isLatest ? "true" : "false"}
                  aria-controls={collapseId}
                  style={{ backgroundColor: isLatest ? "#eef4fc" : undefined }}
                >
                  <span className="d-flex flex-wrap align-items-center gap-2 w-100">
                    <StatusBadge status={entry.status} />
                    <span className="text-secondary small fw-normal ms-auto">
                      {formatDate(entry.createdAt)}
                    </span>
                  </span>
                </button>
              </h3>
              <div
                id={collapseId}
                className={`accordion-collapse collapse ${isLatest ? "show" : ""}`}
                aria-labelledby={headingId}
                data-bs-parent={`#${accordionId}`}
              >
                <div className="accordion-body text-secondary">
                  {entry.note ? (
                    <p className="mb-0">{entry.note}</p>
                  ) : (
                    <p className="mb-0 fst-italic text-muted">
                      Nessuna nota aggiuntiva per questo aggiornamento.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
