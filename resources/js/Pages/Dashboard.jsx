import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  totalPendingTasks,
  myPendingTasks,
  totalProgressTasks,
  myProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-white leading-tight">
          Dashboard
        </h2>
      }
      className="bg-green-200"
    >
      <Head title="Dashboard" />

      <div className="py-12 bg-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3  gap-6">
          <div className="bg-[#B4E4FF] overflow-hidden shadow-lg rounded-lg">
            <div className="p-6">
              <h3 className="text-green-600 text-2xl font-semibold">
                Pending Tasks
              </h3>
              <p className="text-xl mt-4 text-gray-700">
                <span className="mr-2">{myPendingTasks}</span>/
                <span className="ml-2">{totalPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-[#FFFBCA] overflow-hidden shadow-lg rounded-lg">
            <div className="p-6">
              <h3 className="text-green-700 text-2xl font-semibold">
                In Progress Tasks
              </h3>
              <p className="text-xl mt-4 text-gray-700">
                <span className="mr-2">{myProgressTasks}</span>/
                <span className="ml-2">{totalProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-[#A1EEBD] overflow-hidden shadow-lg rounded-lg">
            <div className="p-6">
              <h3 className="text-green-800 text-2xl font-semibold">
                Completed Tasks
              </h3>
              <p className="text-xl mt-4 text-gray-700">
                <span className="mr-2">{myCompletedTasks}</span>/
                <span className="ml-2">{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-10">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="p-6">
              <h3 className="text-green-900 text-xl font-semibold mb-4">
                My Active Tasks
              </h3>

              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-green-900 uppercase bg-[#bbf7d0] border-b border-green-500">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Project Name</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.data.map((task) => (
                    <tr key={task.id} className="hover:bg-green-50">
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2 font-semibold text-green-700 hover:underline">
                        <Link href={route("project.show", task.project.id)}>
                          {task.project.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 font-semibold text-green-700 hover:underline">
                        <Link href={route("task.show", task.id)}>
                          {task.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded text-nowrap text-white text-sm font-medium " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-semibold text-nowrap">
                        {task.due_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
