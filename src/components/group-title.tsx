import Link from "next/link";

export default function GroupTitle({ title, url }: { title: string, url: string }) {
  return (
    <div className="container mx-auto pt-8 flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link href={`/${url}`} className="text-lg text-blue-500 hover:underline">View All</Link>
    </div>
  );
}
