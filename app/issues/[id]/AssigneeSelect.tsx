"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <>
      <SelectRoot
        defaultValue={issue.assignedToUserId || "null"}
        onValueChange={async (userId) => {
          try {
            await axios.patch("/api/issues/" + issue.id, {
              assignedToUserId: userId === "null" ? null : userId,
            });
          } catch (error) {
            toast.error("Changes could not be saved.");
          }
        }}
      >
        <SelectTrigger placeholder="Assign..." />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Suggestions</SelectLabel>
            <SelectItem value="null">Unassigned</SelectItem>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
