import React from "react";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUserForm from "./AddUserForm";
import {ImUserPlus} from "react-icons/im";
export default function AddUserBtn() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <ImUserPlus size={"24"} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ADD USER</DialogTitle>
            <DialogDescription>This form help to add user</DialogDescription>
          </DialogHeader>
          <AddUserForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
