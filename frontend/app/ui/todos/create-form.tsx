'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createTodo } from '@/app/lib/action';

export default function Form() {
  return (
    <form action={createTodo}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Input Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter Todo Title"
            className="peer block w-full rounded-md border border-gray-200 px-5 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          {/* <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Input Content
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                rows="6"
                placeholder="Enter Todo Content"
                className="border-stroke focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 font-medium outline-none transition disabled:cursor-default"
              ></textarea>
            </div>
          </div>
          {/* <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>
      </div>
      {/* Invoice Status */}
      <fieldset>
        <legend className="mb-2 block text-sm font-medium">
          Set the todo status
        </legend>
        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="inprogress"
                name="status"
                type="radio"
                value="In Progress"
                className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
              />
              <label
                htmlFor="pending"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
              >
                In Progress <ClockIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="completed"
                name="status"
                type="radio"
                value="Completed"
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
              <label
                htmlFor="paid"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
              >
                Completed <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
        </div>
        {/* <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.errors?.status &&
            state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div> */}
      </fieldset>
      {/* <div aria-live="polite" aria-atomic="true">
        {state.message ? (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        ) : null}
      </div> */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/todos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Todo</Button>
      </div>
    </form>
  );
}
