interface StatCardProps {
  title: string;
  value: number;
  variant?: 'submitted' | 'verified' | 'completed';
}

export default function StatCard({ title, value, variant = 'submitted' }: StatCardProps) {
  const bgColor = {
    submitted: 'bg-[#0A1A4A]',
    verified: 'bg-[#0A1A4A]',
    completed: 'bg-[#0A1A4A]',
  }[variant];

  return (
    <div className={`${bgColor} text-white rounded-2xl p-6 shadow-lg`}>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-5xl font-bold">{value}</p>
    </div>
  );
}
