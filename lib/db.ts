import { Task } from '../types';

const initialTasks: Task[] = [
    { id: '1', title: 'Nauczyć się Next.js', description: 'Przerobić podstawy App Routera.', status: 'done' },
    { id: '2', title: 'Zrobić zadanie rekrutacyjne', description: 'Napisać Mini Task Board.', status: 'done' },
    { id: '3', title: 'Dodać 6 zadań testowych', description: 'Uzupełnić mock data zgodnie z poleceniem.', status: 'done' },
    { id: '4', title: 'Przetestować formularz', description: 'Sprawdzić czy Server Actions działają poprawnie.', status: 'in-progress' },
    { id: '5', title: 'Zrobić jedzenia', description: 'Ugotować makaron i mięso.', status: 'todo' },
    { id: '6', title: 'Wysłać projekt', description: 'Wysłać link na gmail.', status: 'todo' },
];

const globalForDb = globalThis as unknown as { tasks: Task[] };

export const tasks = globalForDb.tasks || initialTasks;

if (process.env.NODE_ENV !== 'production') {
    globalForDb.tasks = tasks;
}