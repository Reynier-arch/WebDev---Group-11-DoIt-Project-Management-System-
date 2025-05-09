import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, success, project, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white  text-xl text-green-700 leading-tight">
            {`Project "${project.name}"`}
          </h2>
          <Link
            href={route("project.edit", project.id)}
            className="bg-green-400 py-1 px-3  rounded shadow hover:bg-green-500 transition-all"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Project "${project.name}"`} />

      <div className="py-12  bg-green-100 min-h-screen">
        <div className="max-w-7xl e mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border border-green-200 shadow-sm sm:rounded-lg overflow-hidden">
            <div>
              <img
                src={project.image_path}
                alt=""
                className="w-full h-64 object-cover border-b border-green-200"
              />
            </div>
            <div className="p-6 text-green-900">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg text-green-700">Project ID</label>
                    <p className="mt-1">{project.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-green-700">Project Name</label>
                    <p className="mt-1">{project.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-green-700">Project Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-green-700">Created By</label>
                    <p className="mt-1">{project.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg text-green-700">Due Date</label>
                    <p className="mt-1">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-green-700">Create Date</label>
                    <p className="mt-1">{project.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-green-700">Updated By</label>
                    <p className="mt-1">{project.updatedBy.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg text-green-700">Project Description</label>
                <p className="mt-1">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12 bg-green-50">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border border-green-200 shadow-sm sm:rounded-lg overflow-hidden">
            <div className="p-6 text-green-900">
              <TasksTable
                tasks={tasks}
                success={success}
                queryParams={queryParams}
                hideProjectColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
