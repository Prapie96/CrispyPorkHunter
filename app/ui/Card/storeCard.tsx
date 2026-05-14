interface StatCardProps {
  titleCard: string;
  valueCard: number;
  description: string;
}

export default function StatCard({
  titleCard,
  valueCard,
  description,
}: StatCardProps) {
  return (
    <div className="m-4 p-6 bg-linear-to-r from-orange-400 to-amber-500 rounded-xl text-white shadow-lg text-center">
      <p className="text-sm opacity-90">{titleCard}</p>
      <p className="text-5xl font-black my-2">{valueCard}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
}
