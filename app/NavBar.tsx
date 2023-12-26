"use client";
import { Skeleton } from "@/app/components";
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
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const { status, data: session } = useSession();
  const margin = status === "unauthenticated" ? "py-2" : "py-3";

  return (
    <nav className={`border-b mb-5 px-5 h-14 ${margin}`}>
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus status={status} session={session} />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900 font-semibold": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = ({
  status,
  session,
}: {
  status: string;
  session: Session | null;
}) => {
  if (status === "loading") return <Skeleton className="mt-3" width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Sign In
      </Link>
    );

  return (
    <Flex>
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </Flex>
  );
};

export default NavBar;
