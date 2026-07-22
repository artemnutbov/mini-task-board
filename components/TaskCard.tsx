import Link from 'next/link';
import { Task } from '../types';

export default function TaskCard({ task }: { task: Task }) {
    return (
        <div className="border p-4 rounded-lg shadow-sm bg-white">
            <h3 className="font-bold text-lg">{task.title}</h3>
            <p className="text-sm text-gray-500 mb-2">Status: {task.status}</p>
            <p className="text-gray-700 truncate mb-4">{task.description}</p>

            <Link href={`/tasks/${task.id}`} className="text-blue-500 hover:underline text-sm">
                Zobacz szczegóły
            </Link>
        </div>
    );
}