import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new User
          </h2>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12 bg-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-green-50 border border-green-300 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-green-50 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="User Name" />
                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full border border-green-400 focus:ring-green-500 focus:border-green-500 rounded"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_email" value="User Email" />
                <TextInput
                  id="user_email"
                  type="text"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full border border-green-400 focus:ring-green-500 focus:border-green-500 rounded"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_password" value="Password" />
                <TextInput
                  id="user_password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full border border-green-400 focus:ring-green-500 focus:border-green-500 rounded"
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password_confirmation"
                  value="Confirm Password"
                />
                <TextInput
                  id="user_password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full border border-green-400 focus:ring-green-500 focus:border-green-500 rounded"
                  onChange={(e) =>
                    setData("password_confirmation", e.target.value)
                  }
                />
                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("user.index")}
                  className="bg-green-200 border border-green-300 py-1 px-3 text-green-900 rounded shadow transition-all hover:bg-green-300"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-400 border border-emerald-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-500 ml-2">
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
