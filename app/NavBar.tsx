"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-3">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-900 font-semibold": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "p-2 rounded-md hover:text-zinc-800 hover:bg-blue-100 hover:font-medium transition-colors":
                true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
