import React from "react";

const sidebar_options = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Customers", link: "/customers" },
  { name: "Appointments", link: "/appointments" },
];

const Sidebar = () => {
  return (
    <aside className="w-[15%] min-h-screen bg-mgm text-white p-4">
      <nav>
        <ul>
          {sidebar_options.map((option) => (
            <li key={option.name} className="mb-2">
              <a
                href={option.link}
                className="block px-3 py-2 rounded hover:bg-gray-700"
              >
                {option.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
