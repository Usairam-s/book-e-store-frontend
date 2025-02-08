import { HiHome } from "react-icons/hi2";
import { SiWikibooks } from "react-icons/si";
import { FaBookBookmark } from "react-icons/fa6";

export const NavLinks = [
  {
    id: 1,
    href: "/admin/dashboard",
    title: "Home",
    icon: HiHome,
  },
  {
    id: 2,
    href: "/admin/books",
    title: "All Books",
    icon: SiWikibooks,
  },
  {
    id: 3,
    href: "/admin/add-book",
    title: "Add new Book",
    icon: FaBookBookmark,
  },
];
