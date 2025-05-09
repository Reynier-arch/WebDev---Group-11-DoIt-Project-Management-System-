import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import axios from "axios";
import { Link } from "@inertiajs/react";

export default function AuthenticatedLayout({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [notifications, setNotifications] = useState({ dueTasks: [], dueProjects: [] });
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  useEffect(() => {
    axios.get("/notifications/due").then(res => setNotifications(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-green-300">
      {/* ================= NAVBAR ================= */}
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link href="/"><ApplicationLogo className="w-20 h-20" /></Link>

              <div className="hidden sm:flex space-x-8 ms-10 text-lg font-bold">
                <NavLink href={route("dashboard")}       active={route().current("dashboard")}>Dashboard</NavLink>
                <NavLink href={route("project.index")}   active={route().current("project.index")}>Projects</NavLink>
                <NavLink href={route("task.index")}      active={route().current("task.index")}>All Tasks</NavLink>
                <NavLink href={route("user.index")}      active={route().current("user.index")}>Users</NavLink>
                <NavLink href={route("task.myTasks")}    active={route().current("task.myTasks")}>My Tasks</NavLink>
              </div>
            </div>

            <div className="hidden sm:flex items-center space-x-4 relative">
              <div className="relative">
                <button
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="relative text-green-900 hover:text-green-700"
                >
                  🔔
                  {notifications.dueTasks.length + notifications.dueProjects.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                      {notifications.dueTasks.length + notifications.dueProjects.length}
                    </span>
                  )}
                </button>

                {showNotifDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow z-50">
                    <div className="p-2 font-semibold text-gray-700 border-b">Due Activities</div>

                    <div className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                      {notifications.dueTasks.map(t => (
                        <Link key={t.id} href={t.link} className="block p-2 hover:bg-green-100 text-sm">
                          📝 {t.title}
                        </Link>
                      ))}

                      {notifications.dueProjects.map(p => (
                        <Link key={p.id} href={p.link} className="block p-2 hover:bg-green-100 text-sm">
                          📁 {p.title}
                        </Link>
                      ))}

                      {notifications.dueTasks.length === 0 && notifications.dueProjects.length === 0 && (
                        <p className="text-center p-4 text-sm text-gray-400">No due items</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-green-300 text-sm font-medium rounded-md text-green-800 bg-green-100 hover:bg-green-500 hover:text-white transition"
                    >
                      {user.name}
                      <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content className="bg-green-100 text-green-900">
                  <Dropdown.Link className="text-green-900 font-semibold hover:bg-red-100" href={route("logout")} method="post" as="button">Log Out</Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>

            <div className="sm:hidden -me-2">
              <button
                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                className="p-2 rounded-md text-green-900 hover:bg-green-300 focus:bg-green-400 transition"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path className={!showingNavigationDropdown ? "block" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path className={showingNavigationDropdown ? "block" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {showingNavigationDropdown && (
        <div className="sm:hidden bg-green-100">
          <ResponsiveNavLink href={route("dashboard")} active={route().current("dashboard")}>Dashboard</ResponsiveNavLink>
          <ResponsiveNavLink href={route("project.index")} active={route().current("project.index")}>Projects</ResponsiveNavLink>
          <ResponsiveNavLink href={route("task.index")} active={route().current("task.index")}>All Tasks</ResponsiveNavLink>
          <ResponsiveNavLink href={route("user.index")} active={route().current("user.index")}>Users</ResponsiveNavLink>
          <ResponsiveNavLink href={route("task.myTasks")} active={route().current("task.myTasks")}>My Tasks</ResponsiveNavLink>
        </div>
        )}

      </nav>

      {header && (
        <header className="bg-green-700 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main >
        <div className="bg-green-300 shadow p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
