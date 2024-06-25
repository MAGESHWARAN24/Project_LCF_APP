import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {Badge} from "@/components/ui/badge";
export default function ApplicationTitle() {
  const [info, setInfo] = React.useState();
  const {applicationid} = useParams();
  React.useEffect(() => {
    const info = localStorage.getItem("ApplicationInfo");
    setInfo(JSON.parse(info));
    console.log();
  }, [applicationid]);
  return (
    <div className="font-semibold">
      {applicationid && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={"secondary"}>{info?.name}</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{info?.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
