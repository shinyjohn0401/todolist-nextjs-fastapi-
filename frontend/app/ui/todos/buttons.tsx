import { completeTodo, deleteTodo } from '@/app/lib/action';
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateTodo() {
  return (
    <Link
      href="/todos/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Todo</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CompleteTodo({ id }: { id: string }) {
  const completeTodoWithId = completeTodo.bind(null, id);
  return (
    <form action={completeTodoWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <CheckIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteTodo({ id }: { id: string }) {
  const deleteTodoWithId = deleteTodo.bind(null, id);

  return (
    <form action={submit}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
