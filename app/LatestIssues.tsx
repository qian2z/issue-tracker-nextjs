import prisma from "@/prisma/client";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  TableBody,
  TableCell,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma?.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="5" m="3">
        Latest Issues
      </Heading>
      <TableRoot>
        <TableBody>
          {issues?.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Flex justify="between" align="center">
                  <Flex
                    direction={{ initial: "column", md: "row" }}
                    align="start"
                    gap="2"
                  >
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Card>
  );
};

export default LatestIssues;
