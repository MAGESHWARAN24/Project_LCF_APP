import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {formatDistance} from "date-fns";
import {IoLogoAppleAr} from "react-icons/io5";
import React from "react";
import {FaEdit} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils";
import {MdPublishedWithChanges} from "react-icons/md";
import {useDispatch} from "react-redux";
import {
  applicationGetAll,
  applicationPublish,
  GetName,
} from "@/Redux/Slices/Application.Slice";
import {toast} from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ApplicationCard({props, index}) {
  const {
    id,
    name,
    description,
    title,
    createdBy,
    status,
    createdOn,
    publishOn,
  } = props;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlePublish = async () => {
    const response = await dispatch(applicationPublish(id));
    if (response.type.includes("fulfilled")) {
      toast({
        variant: "success",
        title: "Application publish",
        description: "New application published successfully",
      });
      dispatch(applicationGetAll());
    }
  };
  const handleNavigation = (event) => {
    navigate(`/applicationlist/${id}/formbuilder`);
    dispatch(GetName(index));
  };
  return (
    <>
      <Card className="h-40 p-2 flex flex-col justify-between shadow-sm shadow-primary dark:shadow-background">
        <>
          <div className="flex flex-row w-full items-center justify-between">
            <div className="w-3/5 flex items-center">
              <IoLogoAppleAr size={"24"} />
              <p className="font-bold truncate">{name}</p>
            </div>
            <Badge
              className={cn(
                status === "Published" && "bg-green-500 hover:bg-green-500",
                "cursor-pointer"
              )}
            >
              {status}
            </Badge>
            {status === "Draft" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost">
                    <MdPublishedWithChanges size={"24"} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will publish the
                      application
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePublish}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <p className="truncate text-sm text-muted-foreground mb-1 flex items-center gap-2 text-black">
            {formatDistance(createdOn, new Date(), {addSuffix: true})}
            <span>Created by {" " + createdBy}</span>
          </p>
          <p className="truncate text-sm text-muted-foreground mb-5">
            {description || "No description"}
          </p>
        </>
        <div>
          <Button className="w-full gap-5" onClick={handleNavigation}>
            Configure application <FaEdit size={"24"} />
          </Button>
        </div>
      </Card>
    </>
  );
}
