import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {formatDistance} from "date-fns";
import {IoDocumentOutline} from "react-icons/io5";
import React from "react";
import {FaEdit} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export default function FormCard() {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`${1}`);
  };
  return (
    <>
      <Card className="h-40 p-2 flex flex-col justify-between shadow-sm shadow-primary dark:shadow-background">
        <div className="">
          <div className="flex items-center justify-between">
            <span className="truncate font-bold flex items-center gap-2">
              <IoDocumentOutline />
              Form Name
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
          <Button className="w-full gap-5" onClick={handleNavigation}>
            Configure form <FaEdit size={"24"} />
          </Button>
        </div>
      </Card>
    </>
  );
}
