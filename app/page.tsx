import { tasks } from '../lib/db';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Link from 'next/link';
import { TaskStatus } from '../types';
import { buttonVariants } from '@/components/ui/button';

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

  const getButtonVariant = (status?: string): "default" | "outline" => {
    const isActive = currentStatus === status || (!currentStatus && !status);
    return isActive ? 'default' : 'outline';
  };

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Mini Task Board</h1>

      <TaskForm />

      { }
      <div className="flex gap-2 mb-8 flex-wrap">
        <Link
          href="/"
          className={buttonVariants({ variant: getButtonVariant() })}
        >
          Wszystkie
        </Link>
        <Link
          href="/?status=todo"
          className={buttonVariants({ variant: getButtonVariant('todo') })}
        >
          Do zrobienia
        </Link>
        <Link
          href="/?status=in-progress"
          className={buttonVariants({ variant: getButtonVariant('in-progress') })}
        >
          W trakcie
        </Link>
        <Link
          href="/?status=done"
          className={buttonVariants({ variant: getButtonVariant('done') })}
        >
          Zrobione
        </Link>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg bg-muted/50">
          <p className="text-muted-foreground">Brak zadań dla tego filtru.</p>
        </div>
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