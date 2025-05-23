import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("project.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-white leading-tight">
            Create New Project
          </h2>
        </div>
      }
    >
      <Head title="Create Project" />

      <div className="py-12 bg-green-50 min-h-screen">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border border-green-100 shadow-md sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white sm:rounded-lg"
            >
                            <div>
                <InputLabel htmlFor="project_image_path" value="Project Image" className="text-green-800" />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full border-green-300 focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2 text-red-600" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" className="text-green-800" />
                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full border-green-300 focus:ring-emerald-500 focus:border-emerald-500"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2 text-red-600" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="project_description" value="Project Description" className="text-green-800" />
                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full border-green-300 focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2 text-red-600" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="project_due_date" value="Project Deadline" className="text-green-800" />
                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full border-green-300 focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2 text-red-600" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Project Status" className="text-green-800" />
                <SelectInput
                  name="status"
                  id="project_status"
                  className="mt-1 block w-full border-green-300 focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2 text-red-600" />
              </div>

              <div className="mt-6 text-right">
                <Link
                  href={route("project.index")}
                  className="bg-green-100 text-green-800 py-1 px-4 rounded shadow-sm hover:bg-green-200 transition-all mr-2"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="bg-emerald-600 text-white py-1 px-4 rounded shadow hover:bg-emerald-700 transition-all"
                >
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
