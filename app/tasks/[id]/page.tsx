import { tasks } from '../../../lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function TaskDetails({
    params
}: {
    params: Promise<{ id: string }>
}) {
    // NOWE: Czekamy na rozpakowanie ID z paska adresu
    const resolvedParams = await params;

    const task = tasks.find((t) => t.id === resolvedParams.id);

    if (!task) {
        notFound();
    }

    return (
        <main className="max-w-2xl mx-auto p-8">
            <Link href="/" className="text-blue-500 mb-4 inline-block hover:underline">
                &larr; Powrót do listy
            </Link>

            <div className="border p-6 rounded-lg bg-white shadow-sm mt-4">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="my-4">
                    <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                        Status: {task.status}
                    </span>
                </div>
                <p className="text-gray-700">{task.description}</p>
            </div>
        </main>
    );
}