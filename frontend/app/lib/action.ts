'use server';

import { revalidatePath, unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  status: z.enum(['Completed', 'In Progress']),
});

const CreateTodo = FormSchema.omit({ id: true });

// This is temporary
export type State = {
  errors?: {
    title?: string[];
    content?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createTodo(formData: FormData) {
  const { title, content, status } = CreateTodo.parse({
    title: formData.get('title'),
    content: formData.get('content'),
    status: formData.get('status'),
  });

  try {
    const res = await fetch(`http://127.0.0.1:8000/createtodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        status: status,
      }),
    });
    const data = await res.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch create todo.');
  }

  revalidatePath('/todos');
  redirect('/todos');
}

export async function deleteTodo(id: string) {
  unstable_noStore();
  try {    
    const res = await fetch(`http://127.0.0.1:8000/deletetodo?id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete todo.');
  }
  revalidatePath('/todos');
}

export async function completeTodo(id: string) {
  try {    
    const res = await fetch(`http://127.0.0.1:8000/completetodo?id=${id}`, {
      method: 'PUT',
    });
    const data = await res.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to complete todo.');
  }
  revalidatePath('/todos');
}
