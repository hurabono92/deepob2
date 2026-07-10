export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-primary-dark px-4 py-16 text-center text-white">
      <h1 className="text-2xl font-black sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-3 text-sm text-white/80">{subtitle}</p>}
    </div>
  );
}
