import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  count: number;
}

export const StatsCard = ({ icon, label, count }: Props) => (
  <div className="flex items-center gap-4 rounded-lg border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
    <div className="rounded-xl bg-gray-100 p-3">{icon}</div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{count}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  </div>
);
