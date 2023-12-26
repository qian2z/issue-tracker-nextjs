"use client";
import { Spinner } from "@/app/components";
import { Cross2Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialogRoot>
        <AlertDialogTrigger>
          <Button color="red" disabled={isDeleting}>
            <TrashIcon />
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you confirm to delete this issue? This action cannot be undo.
          </AlertDialogDescription>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialogCancel>
              <Button variant="soft" color="gray">
                <Cross2Icon />
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button variant="solid" color="red" onClick={onDelete}>
                <TrashIcon />
                Delete Issue
              </Button>
            </AlertDialogAction>
          </Flex>
        </AlertDialogContent>
      </AlertDialogRoot>
      <AlertDialogRoot open={error}>
        <AlertDialogContent>
          <AlertDialogTitle>Error</AlertDialogTitle>
          <AlertDialogDescription>
            This issue could not be deleted.
          </AlertDialogDescription>
          <Flex justify="end">
            <Button color="gray" variant="soft" onClick={() => setError(false)}>
              OK
            </Button>
          </Flex>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
};

export default DeleteIssueButton;
