import { tasks } from '../../../lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';

export default async function TaskDetails({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const resolvedParams = await params;
    const task = tasks.find((t) => t.id === resolvedParams.id);

    if (!task) {
        notFound();
    }

    return (
        <main className="max-w-2xl mx-auto p-4 md:p-8">
            <Link
                href="/"
                className={buttonVariants({ variant: 'ghost', className: 'mb-4 -ml-4' })}
            >
                &larr; Powrót do listy
            </Link>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <CardTitle className="text-2xl">{task.title}</CardTitle>
                        <Badge variant="secondary" className="text-sm">Status: {task.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {task.description}
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}