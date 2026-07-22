// lib/db.ts
import { Task } from '../types';

/// zresetuje się po restarcie aplikacji
export const tasks: Task[] = [
    { id: '1', title: 'Nauczyć się Next.js', description: 'Przerobić podstawy App Routera.', status: 'done' },
    { id: '2', title: 'Zrobić zadanie', description: 'Napisać Mini Task Board.', status: 'in-progress' },
    { id: '3', title: 'Odpocząć', description: 'Położyć się po wysłaniu zadania.', status: 'todo' },
];