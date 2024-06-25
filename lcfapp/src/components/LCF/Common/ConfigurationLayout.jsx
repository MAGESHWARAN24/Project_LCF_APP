import React from "react";
import Logo from "./Logo";
import RightNavBar from "./RightNavBar";
import {Outlet} from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function ConfigurationLayout() {
  return (
    <div className="min-h-screen max-h-svh max-w-full h-screen bg-background">
      <header className="h-[6%] w-full flex items-center shadow-md border-b">
        <nav className="h-full w-full flex items-center justify-between">
          <Logo />
          <RightNavBar />
        </nav>
      </header>
      <main className="h-[94%] w-full flex flex-row">
        <aside className="h-full w-20 shadow-sm shadow-primary py-2">
          <LeftSideBar />
        </aside>
        <main className="w-full h-full flex">
          <Outlet />
        </main>
      </main>
    </div>
  );
}
