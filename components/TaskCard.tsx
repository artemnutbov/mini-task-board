import Link from 'next/link';
import { Task } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';

export default function TaskCard({ task }: { task: Task }) {
    const getBadgeVariant = (status: string) => {
        if (status === 'done') return 'default';
        if (status === 'in-progress') return 'secondary';
        return 'outline';
    };

    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg line-clamp-1">{task.title}</CardTitle>
                <Badge variant={getBadgeVariant(task.status)}>{task.status}</Badge>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
            </CardContent>
            <CardFooter>
                <Link
                    href={`/tasks/${task.id}`}
                    className={buttonVariants({ variant: 'link', className: 'p-0' })}
                >
                    Zobacz szczegóły
                </Link>
            </CardFooter>
        </Card>
    );
}