import Image from 'next/image';
import { Todo } from '@/app/lib/definitions';
import { fetchFilteredTodos } from '@/app/lib/data';
import { deleteTodo } from '@/app/lib/action';
import { CompleteTodo, DeleteTodo } from './buttons';

export default async function TodoListTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const todos = await fetchFilteredTodos(query, currentPage);

  return (
    <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 rounded-sm border bg-white px-5 pb-2.5 pt-6 xl:pb-1">
      <div className="flex items-start">
        <div className="grow-1">
          <h5>Todos</h5>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4 text-left">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Todos
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo: Todo) => (
              <tr key={todo.id}>
                <td className="dark:border-strokedark border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {todo.title}
                  </h5>
                  <p className="text-sm">{todo.content}</p>
                </td>
                <td className="dark:border-strokedark border-b border-[#eee] px-4 py-5">
                  <p className="bg-success text-success inline-flex rounded-full bg-opacity-10 py-1 pe-3 text-sm font-medium">
                    {todo.status}
                  </p>
                </td>
                <td className="dark:border-strokedark border-b border-[#eee] px-4 py-5">
                  <div className="flex items-center space-x-3.5">
                    <CompleteTodo id={todo.id}/>
                    <DeleteTodo id={todo.id}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
