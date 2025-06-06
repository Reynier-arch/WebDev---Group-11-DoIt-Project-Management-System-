import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, project }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("project.update", project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-white leading-tight">
            Edit project "{project.name}"
          </h2>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12 bg-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border border-green-200 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-green-50 shadow-inner sm:rounded-lg"
            >
              {project.image_path && (
                <div className="mb-4">
                  <img src={project.image_path} className="w-64 rounded border border-green-200" />
                </div>
              )}
              <div>
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Image"
                  className="text-green-700"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full border-green-200 focus:ring-green-400 focus:border-green-400"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" className="text-green-700" />
                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full border-green-200 focus:ring-green-400 focus:border-green-400"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_description" value="Project Description" className="text-green-700" />
                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full border-green-200 focus:ring-green-400 focus:border-green-400"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_due_date" value="Project Deadline" className="text-green-700" />
                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full border-green-200 focus:ring-green-400 focus:border-green-400"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Project Status" className="text-green-700" />
                <SelectInput
                  name="status"
                  id="project_status"
                  className="mt-1 block w-full border-green-200 focus:ring-green-400 focus:border-green-400"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.project_status} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("project.index")}
                  className="bg-green-100 py-1 px-3 text-green-800 rounded shadow hover:bg-green-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-green-400 py-1 px-3 text-white rounded shadow hover:bg-green-500">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
