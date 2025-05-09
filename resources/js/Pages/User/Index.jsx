import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, users, queryParams = null, success }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction =
        queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete the user?")) return;
    router.delete(route("user.destroy", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-white leading-tight">
            Users
          </h2>
          <Link
            href={route("user.create")}
            className="bg-green-400 py-1 px-3 text-black rounded shadow hover:bg-green-500 hover:text-white transition-all"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Users" />
      <div className="py-12 bg-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4 shadow-sm">
              {success}
            </div>
          )}

          <div className="bg-[#e9fbe8] border border-green-200 shadow-md rounded-lg p-6 text-green-900 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <TextInput
                className="w-full bg-white border border-green-200 rounded"
                defaultValue={queryParams.name}
                placeholder="Search by Name"
                onBlur={(e) => searchFieldChanged("name", e.target.value)}
                onKeyPress={(e) => onKeyPress("name", e)}
              />
              <TextInput
                className="w-full bg-white border border-green-200 rounded"
                defaultValue={queryParams.email}
                placeholder="Search by Email"
                onBlur={(e) => searchFieldChanged("email", e.target.value)}
                onKeyPress={(e) => onKeyPress("email", e)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {users.data.map((user) => (
                <div
                  key={user.id}
                  className="bg-white border border-green-200 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-1">{user.name}</h3>
                    <p className="text-sm text-blue-500 text-nowrap mb-1">
                      <strong>Email:</strong> {user.email}
                    </p>
                   
                    <p className="text-sm text-black-800 font-semibold text-right">
                      <em>{user.created_at}</em>
                    </p>
                  </div>
                  <div className="mt-4 text-right">
                    <Link
                      href={route("user.edit", user.id)}
                      className="text-blue-600 hover:underline font-semibold mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user)}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
