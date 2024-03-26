import Form from '@/app/ui/todos/create-form';
import Breadcrumbs from '@/app/ui/todos/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Todos', href: '/todos' },
          {
            label: 'Create Todo',
            href: '/todos/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
