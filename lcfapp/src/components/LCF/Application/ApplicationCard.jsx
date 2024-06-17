import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {formatDistance} from "date-fns";
import {IoLogoAppleAr} from "react-icons/io5";
import React from "react";
import {FaEdit} from "react-icons/fa";

export default function ApplicationCard() {
  return (
    <>
      <Card className="h-40 p-2 flex flex-col justify-between">
        <div className="">
          <div className="flex items-center justify-between">
            <span className="truncate font-bold flex items-center gap-2">
              <IoLogoAppleAr />
              Application Name
            </span>
            <Badge className={"bg-primary"}>Draft</Badge>
          </div>
          <p className="truncate text-sm text-muted-foreground mb-1">
            {formatDistance(new Date(), new Date(), {addSuffix: true})}
          </p>
          <p className="truncate text-sm text-muted-foreground mb-5">
            {"No description"}
          </p>
        </div>
        <div>
          <Button className="w-full gap-5">
            Configure application <FaEdit size={"24"} />
          </Button>
        </div>
      </Card>
    </>
  );
}
