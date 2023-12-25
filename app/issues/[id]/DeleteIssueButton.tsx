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

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Button color="red">
          <TrashIcon />
          Delete Issue
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
            <Button variant="solid" color="red">
              <TrashIcon />
              Delete Issue
            </Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default DeleteIssueButton;
