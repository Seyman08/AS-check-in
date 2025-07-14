type StatusCardProps = {
  title: string;
  value: string;
};

export default function StatusCard({ title, value }: StatusCardProps) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
}
