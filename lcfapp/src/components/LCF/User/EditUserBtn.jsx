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
import {FaEdit, FaUserEdit} from "react-icons/fa";
import EditUserForm from "./EditUserForm";
import {MdEdit} from "react-icons/md";
export default function EditUserBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <MdEdit size={"24"} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <FaEdit size={"24"} /> Edit
            </div>
          </DialogTitle>
          <DialogDescription>
            This form help to modify the user credentials
          </DialogDescription>
        </DialogHeader>
        <EditUserForm />
      </DialogContent>
    </Dialog>
  );
}
