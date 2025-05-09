import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import ApplicationLogo from "@/Components/ApplicationLogo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, projects, queryParams = null, success }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("project.index"), queryParams, {
      preserveState: true,
      replace: true,
    });
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const deleteProject = (project) => {
    if (!window.confirm("Are you sure you want to delete the project?")) return;
    router.delete(route("project.destroy", project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-white leading-tight">Projects</h2>
          <Link
            href={route("project.create")}
            className="bg-green-200 py-1 px-4 text-black rounded shadow hover:bg-green-500 hover:text-white transition"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12 bg-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-green-500 text-white p-4 rounded mb-6">
              {success}
            </div>
          )}

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <TextInput
              className="w-full"
              defaultValue={queryParams.name || ""}
              placeholder="Search Project Name"
              onBlur={(e) => searchFieldChanged("name", e.target.value)}
              onKeyPress={(e) => onKeyPress("name", e)}
            />
            <SelectInput
              className="w-full"
              value={queryParams.status || ""}
              onChange={(e) => searchFieldChanged("status", e.target.value)}
            >
              <option value="">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </SelectInput>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.data.map((project) => (
              <div
                key={project.id}
                className="bg-[#bbf7d0] shadow-lg rounded-lg overflow-hidden border border-green-100"
              >
                <img
                  src={project.image_path}
                  alt={project.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-green-800 mb-1">
                    <Link href={route("project.show", project.id)} className="hover:underline">
                      {project.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-green-700 mb-2">
                    Status:{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded text-white text-xs ${PROJECT_STATUS_CLASS_MAP[project.status]}`}
                    >
                      {PROJECT_STATUS_TEXT_MAP[project.status]}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Created: {project.created_at}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Due: {project.due_date}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    By: {project.createdBy.name}
                  </p>
                  <div className="flex justify-between">
                    <Link
                      href={route("project.edit", project.id)}
                      className="text-green-700 font-bold hover:underline text-lg:px-10"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProject(project)}
                      className="text-red-600 font-bold hover:underline text-lg:px-10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination links={projects.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
