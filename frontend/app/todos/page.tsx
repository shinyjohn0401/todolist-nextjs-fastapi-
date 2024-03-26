import Pagination from '@/app/ui/todos/pagination';
import TodoListTable from '../ui/todos/table';
import Search from '../ui/search';
import { CreateTodo } from '../ui/todos/buttons';
import { fetchTodoPages } from '../lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTodoPages(query);

  return (
    <main>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search todos..." />
        <CreateTodo />
      </div>
      <TodoListTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
