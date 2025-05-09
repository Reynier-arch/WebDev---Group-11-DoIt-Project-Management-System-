import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";

export default function Show({ auth, task }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-white leading-tight">
            {`Task "${task.name}"`}
          </h2>
          <Link
            href={route("task.edit", task.id)}
            className="bg-green-400 py-1 px-3 text-white rounded shadow hover:bg-green-500 transition-all"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Task "${task.name}"`} />
      <div className="py-12 bg-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-[#e9fbe8] border border-green-300 shadow-md rounded-lg overflow-hidden">
            <div>
              <img
                src={task.image_path}
                alt="Project"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-800">
              <div className="grid gap-6 grid-cols-2">
                <div>
                  <div>
                    <label className="font-bold text-md text-green-800">Task ID</label>
                    <p className="mt-1">{task.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-md text-green-800">Task Name</label>
                    <p className="mt-1">{task.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-md text-green-800">Task Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          TASK_STATUS_CLASS_MAP[task.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-md text-green-800">Task Priority</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          TASK_PRIORITY_CLASS_MAP[task.priority]
                        }
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-md text-green-800">Created By</label>
                    <p className="mt-1">{task.createdBy.name}</p>
                  </div>
                </div>

                <div>
                  <div>
                    <label className="font-bold text-md text-green-800">Due Date</label>
                    <p className="mt-1">{task.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-md text-green-800">Create Date</label>
                    <p className="mt-1">{task.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-md text-green-800">Updated By</label>
                    <p className="mt-1">{task.updatedBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-md text-green-800">Project</label>
                    <p className="mt-1">
                      <Link
                        href={route("project.show", task.project.id)}
                        className="hover:underline text-green-700"
                      >
                        {task.project.name}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-md text-green-800">Assigned User</label>
                    <p className="mt-1">{task.assignedUser.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="font-bold text-md text-green-800">Task Description</label>
                <p className="mt-2 bg-white p-4 rounded border border-green-200 shadow-sm">
                  {task.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
