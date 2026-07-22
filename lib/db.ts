import { Task } from '../types';

const initialTasks: Task[] = [
    { id: '1', title: 'Nauczyć się Next.js', description: 'Przerobić podstawy App Routera.', status: 'done' },
    { id: '2', title: 'Zrobić zadanie', description: 'Napisać Mini Task Board.', status: 'in-progress' },
    { id: '3', title: 'Odpocząć', description: 'Wypić kawę po wysłaniu zadania.', status: 'todo' },
];

const globalForDb = globalThis as unknown as { tasks: Task[] };

export const tasks = globalForDb.tasks || initialTasks;

if (process.env.NODE_ENV !== 'production') {
    globalForDb.tasks = tasks;
}