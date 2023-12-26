"use client";
import {
  Avatar,
  Container,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  const margin = status === "authenticated" ? "py-3" : "py-4";

  return (
    <nav className={`border-b mb-5 px-5 h-14 ${margin}`}>
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <FaBug />
            </Link>
            <ul className="flex space-x-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
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
                </li>
              ))}
            </ul>
          </Flex>
          <Flex>
            {status === "authenticated" && (
              <DropdownMenuRoot>
                <DropdownMenuTrigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link href="/api/auth/signout">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuRoot>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Sign In</Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
