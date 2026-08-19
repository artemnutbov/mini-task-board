import { addTaskAction } from '../lib/actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TaskForm() {
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Dodaj nowe zadanie</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={addTaskAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tytuł</label>
                        <Input name="title" required placeholder="Wpisz tytuł zadania..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Opis</label>
                        <Textarea name="description" required rows={3} placeholder="Krótki opis zadania..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        { }
                        <Select name="status" defaultValue="todo">
                            <SelectTrigger>
                                <SelectValue placeholder="Wybierz status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todo">Do zrobienia</SelectItem>
                                <SelectItem value="in-progress">W trakcie</SelectItem>
                                <SelectItem value="done">Zrobione</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full">
                        Dodaj zadanie
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}