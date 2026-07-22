'use server'

import { tasks } from './db';
import { TaskStatus } from '../types';
import { revalidatePath } from 'next/cache';

export async function addTaskAction(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as TaskStatus;

    if (!title || !description) return;

    const newTask = {
        id: Date.now().toString(),
        title,
        description,
        status
    };

    tasks.unshift(newTask);

    revalidatePath('/');
}