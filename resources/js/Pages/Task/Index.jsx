import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({ auth, success, tasks, queryParams = null }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-white leading-tight">
            Tasks
          </h2>
          <Link
            href={route("task.create")}
            className="bg-green-400 py-1 px-3 text-black rounded shadow hover:bg-green-500 hover:text-white transition-all"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12 bg-green-100 min-h-screen">
        <div className="max-w-7xl bg-green-100 mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border border-green-200 bg-green-500 shadow-sm sm:rounded-lg overflow-hidden">
            <div className="p-6 text-green-900">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                success={success}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
