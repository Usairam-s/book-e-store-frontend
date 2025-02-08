import React from "react";
import { NavLinks } from "../../data";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="flex flex-col gap-2">
      {NavLinks.map((item) => {
        return (
          <Link
            to={item.href}
            className={`flex cursor-pointer items-center gap-4 p-2 rounded-md hover:bg-gray-200 ${
              location.pathname == item.href ? "bg-primary" : ""
            }`}
          >
            <span>{<item.icon />}</span>
            <span className="md:inline hidden">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
