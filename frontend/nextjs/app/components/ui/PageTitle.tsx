type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="pb-3 mb-4 border-bottom mt-4">
      <h1 className="h2 text-primary fw-semibold">{title}</h1>
      {subtitle && <p className="text-secondary lead mb-0 fs-6">{subtitle}</p>}
    </div>
  );
}
