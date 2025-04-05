import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

export default function TableHeading({
    name, 
    sortable = true, 
    sort_field = null, 
    sort_direction = null,
    sortChanged = () => {},
    children,
}) {
    return (
        <th onClick={(e) => sortChanged(name)}>
            <div className="px-3 py-4 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon className={
                        "w-4 " + 
                        (sort_field === name && 
                        sort_direction === "asc" 
                        ? "text-green" : "")
                        } 
                        /> 
                    <ChevronDownIcon className={"w-4 " +
                        (sort_field === name && 
                            sort_direction === "asc" 
                            ? "text-green" : "")}
                    />
                    </div>  
                )
                }
            </div>
        </th>
)}