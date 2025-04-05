import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";

export default function TasksTable({tasks, queryParams = null}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value 
            } else {
                delete queryParams[name]
            }
            router.get(route('task.index'), queryParams);
        };
    
        const onKeyPress = (name, e) => {
            if (e.key !== 'Enter') return;
    
            searchFieldChanged(name, e.target.value);
        };
    
        const sortChanged = (name) => {
            if (name === queryParams.sort_field) {
                if(queryParams.sort_direction === "asc") {
                    queryParams.sort_direction = "desc"
                } else {
                    queryParams.sort_direction = "asc"
                }
            } else {
                queryParams.sort_field = name;
                queryParams.sort_direction = "asc"
            }
            router.get(route('task.index'), queryParams);
        };

    return (
    <>
     <div className="overflow-auto">
                              <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400">
                                <thead className="text-xs text-black-700 uppercase bg-black-50 dark:bg-white-700 dark:text-black-400 border-b-2 border-black-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-4"></th>
                                        <th className="px-3 py-4"></th>
                                        <th className="px-3 py-4">
                                            <TextInput 
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Task Name"
                                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-4">
                                            <SelectInput 
                                                className="w-full"
                                                defaultValue={queryParams.status}
                                                onChange={(e) =>
                                                    searchFieldChanged('status', e.target.value)
                                                }
                                            >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>

                                             </SelectInput>   
                                        </th>
                                        <th className="px-3 py-4"></th>
                                        <th className="px-3 py-4"></th>
                                        <th className="px-3 py-4"></th>
                                        <th className="px-3 py-4 text-right"></th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-black-700 uppercase bg-black-50 dark:bg-white-700 dark:text-black-400 border-b-2 border-black-500">
                                    <tr className="text-nowrap">
                                       <TableHeading
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >ID</TableHeading>
                                        
                                        <th 
                                        className="px-3 py-4 cursor-pointer">
                                            Image
                                        </th>

                                        <TableHeading 
                                            name="name text-nowrap"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Name</TableHeading>

                                        <TableHeading 
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Status</TableHeading>

                                        <TableHeading 
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Created Date</TableHeading>

                                        <TableHeading 
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Due Date</TableHeading>

                                        <th 
                                        className="px-3 py-4 cursor-pointer">
                                            Created By
                                        </th>

                                        <th 
                                        className="px-3 py-4 text-right cursor-pointer">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => (
                                        <tr className="bg-white border-b dark:bg-black-800 dark:border-black-700" key={task.id}>
                                        <td className="px-3 py-2">{task.id}</td>
                                        <td className="px-3 py-2">
                                            <img src={task.image_path} style={{width:60}} />
                                        </td>
                                        <td className="px-3 py-2">{task.name}</td>
                                        <td className="px-3 py-2">
                                            <span className={
                                                "px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]
                                                    }
                                            >
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">{task.created_at}</td>
                                        <td className="px-3 py-2">{task.due_date}</td>
                                        <td className="px-3 py-2">{task.createdBy.name}</td>
                                        <td className="px-3 py-2">
                                            <Link
                                                href={route("task.edit", task.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route("task.destroy", task.id)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                              </table>
                              </div>
                                <Pagination links={tasks.meta.links} />   
    </>

    
)}