import { tasks } from '../lib/db';
import TaskCard from '../components/TaskCard';
import Link from 'next/link';
import { TaskStatus } from '../types';

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ status?: TaskStatus }>
}) {
  const resolvedParams = await searchParams;
  const currentStatus = resolvedParams.status;

  const filteredTasks = currentStatus
    ? tasks.filter((t) => t.status === currentStatus)
    : tasks;

  const getButtonClass = (status?: string) => {
    const isActive = currentStatus === status || (!currentStatus && !status);
    return `px-4 py-2 rounded transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`;
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mini Task Board</h1>

      { }
      <div className="flex gap-2 mb-8">
        <Link href="/" className={getButtonClass()}>Wszystkie</Link>
        <Link href="/?status=todo" className={getButtonClass('todo')}>Do zrobienia</Link>
        <Link href="/?status=in-progress" className={getButtonClass('in-progress')}>W trakcie</Link>
        <Link href="/?status=done" className={getButtonClass('done')}>Zrobione</Link>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">Brak zadań dla tego filtru.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </main>
  );
}